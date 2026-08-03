/**
 * cutout.mjs — remove a flat studio background from a product shot.
 *
 * Catalogue photos ship on white. Dropped straight onto the template's grey
 * cards they read as white rectangles, so the background has to go.
 *
 * A global "delete everything near white" threshold is wrong here: these
 * machines have white cabs, white bodywork and white lettering, and a global
 * pass punches holes straight through them. So we flood-fill inward from the
 * border and only remove background that is actually *connected* to the edge.
 *
 * Edges are then feathered by alpha, and the residual white blended into those
 * semi-transparent pixels is divided back out — otherwise every cut-out carries
 * a pale halo that is glaringly obvious on a dark surface.
 */

/**
 * @param {Buffer} data      raw RGBA pixels
 * @param {number} width
 * @param {number} height
 * @param {object} [opts]
 * @param {number} [opts.tol]    distance still counted as pure background (0–255)
 * @param {number} [opts.feather] distance over which alpha ramps 0→255
 * @returns {{ removed: boolean, bg: [number,number,number]|null, cleared: number }}
 */
export function cutout(data, width, height, opts = {}) {
  const tol = opts.tol ?? 20;
  const feather = opts.feather ?? 38;
  const idx = (x, y) => (y * width + x) * 4;

  /* Background colour = the dominant colour around the whole border, not just
     the four corners. Corners are unreliable: a crop can clip a dark object or
     a watermark into one of them, and requiring all four to agree throws away
     a perfectly good studio sweep. We do require the dominant colour to own
     most of the border, otherwise this is a real scene and we leave it alone. */
  const border = [];
  for (let x = 0; x < width; x++) {
    border.push(idx(x, 0), idx(x, height - 1));
  }
  for (let y = 0; y < height; y++) {
    border.push(idx(0, y), idx(width - 1, y));
  }

  if (border.some((i) => data[i + 3] < 250)) return { removed: false, bg: null, cleared: 0 };

  const buckets = new Map();
  for (const i of border) {
    const key = `${data[i] >> 3}-${data[i + 1] >> 3}-${data[i + 2] >> 3}`;
    const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    e.n++;
    e.r += data[i];
    e.g += data[i + 1];
    e.b += data[i + 2];
    buckets.set(key, e);
  }
  const top = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  if (!top || top.n / border.length < 0.6) return { removed: false, bg: null, cleared: 0 };

  const br = Math.round(top.r / top.n);
  const bg_ = Math.round(top.g / top.n);
  const bb = Math.round(top.b / top.n);

  const dist = (i) =>
    Math.max(Math.abs(data[i] - br), Math.abs(data[i + 1] - bg_), Math.abs(data[i + 2] - bb));

  /* Flood fill from every border pixel that is background-coloured.
     Explicit stack, not recursion — these images run to millions of pixels. */
  const isBg = new Uint8Array(width * height);
  const stack = [];

  const push = (x, y) => {
    const p = y * width + x;
    if (isBg[p]) return;
    if (dist(p * 4) > tol) return;
    isBg[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  let cleared = 0;
  for (let p = 0; p < isBg.length; p++) {
    if (isBg[p]) {
      data[p * 4 + 3] = 0;
      cleared++;
    }
  }
  if (!cleared) return { removed: false, bg: null, cleared: 0 };

  /* Studio shots almost always sit on a soft drop shadow. The shadow is too far
     from the sweep colour for the flood fill to take, so it survives as a grey
     smear that looks like dirt on a dark surface.
     Second pass: keep flooding through a much wider tolerance, but only through
     pixels that are *desaturated* — a shadow is grey, the machine is yellow — and
     fade them out by how dark they are. The saturation test is what stops this
     from eating into the paintwork. */
  const shadowTol = opts.shadowTol ?? 96;
  const shadowStack = [];
  const seen = new Uint8Array(width * height);

  const isShadow = (i) => {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    return chroma <= 26 && dist(i) <= shadowTol;
  };

  const pushShadow = (x, y) => {
    const p = y * width + x;
    if (seen[p] || isBg[p]) return;
    if (!isShadow(p * 4)) return;
    seen[p] = 1;
    shadowStack.push(p);
  };

  /* seed from every cleared pixel's neighbours */
  for (let p = 0; p < isBg.length; p++) {
    if (!isBg[p]) continue;
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) pushShadow(x - 1, y);
    if (x < width - 1) pushShadow(x + 1, y);
    if (y > 0) pushShadow(x, y - 1);
    if (y < height - 1) pushShadow(x, y + 1);
  }

  while (shadowStack.length) {
    const p = shadowStack.pop();
    const x = p % width;
    const y = (p - x) / width;
    const i = p * 4;
    /* fully transparent at the sweep colour, fully opaque by shadowTol */
    const a = Math.max(0, Math.min(1, (dist(i) - tol) / (shadowTol - tol)));
    data[i + 3] = Math.round(a * 255);
    if (x > 0) pushShadow(x - 1, y);
    if (x < width - 1) pushShadow(x + 1, y);
    if (y > 0) pushShadow(x, y - 1);
    if (y < height - 1) pushShadow(x, y + 1);
  }

  /* Feather: a kept pixel touching the cleared region gets alpha proportional to
     how far its colour sits from the background, then has the background colour
     unmixed out of it so no white fringe survives. */
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (isBg[p]) continue;
      const touchesBg =
        (x > 0 && isBg[p - 1]) ||
        (x < width - 1 && isBg[p + 1]) ||
        (y > 0 && isBg[p - width]) ||
        (y < height - 1 && isBg[p + width]);
      if (!touchesBg) continue;

      const i = p * 4;
      const d = dist(i);
      if (d >= feather) continue;

      const a = Math.max(0, Math.min(1, (d - tol) / (feather - tol)));
      if (a <= 0) {
        data[i + 3] = 0;
        continue;
      }
      /* un-premultiply against the background we are removing */
      data[i] = Math.max(0, Math.min(255, Math.round((data[i] - br * (1 - a)) / a)));
      data[i + 1] = Math.max(0, Math.min(255, Math.round((data[i + 1] - bg_ * (1 - a)) / a)));
      data[i + 2] = Math.max(0, Math.min(255, Math.round((data[i + 2] - bb * (1 - a)) / a)));
      data[i + 3] = Math.round(a * 255);
    }
  }

  return { removed: true, bg: [br, bg_, bb], cleared };
}
