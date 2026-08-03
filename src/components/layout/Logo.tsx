import Image from 'next/image';
import { SITE } from '@/lib/constants';

type LogoConfig = {
  mode: 'image' | 'mark' | 'wordmark';
  flat?: boolean;
  src?: string;
  srcDark?: string;
  svg?: string;
};

/* Brand logo. Three modes, written by scripts/client/apply.mjs from the
   client's own artwork — no component edits needed per client.

   'image'    wide artwork that already contains the company name: shown alone.
   'mark'     square emblem with no readable name at header size: shown next to
              the SITE.name wordmark, same layout as the built-in mark.
   'wordmark' the template's own mark + SITE.name, when no usable logo exists.

   `dark` = the logo sits on a dark surface (footer, hero overlay). A flat
   single-colour mark gets a white knockout; a full-colour emblem would be
   destroyed by that, so it keeps its artwork and gets a light plate instead. */
export default function Logo({
  className = 'h-7',
  textClassName = 'text-primary',
  dark = false,
}: {
  className?: string;
  textClassName?: string;
  dark?: boolean;
}) {
  const logo = SITE.logo as LogoConfig | undefined;
  const asset = logo?.svg ?? logo?.src;

  if (logo && logo.mode !== 'wordmark' && asset) {
    const flat = logo.flat !== false;
    const src = (dark && flat && logo.srcDark) || asset;
    const plate = dark && !flat;

    /* A square emblem at header height reads as a smudge, so 'mark' mode
       oversizes it past the text line — the flex row stays centred on it. */
    const img = (
      <Image
        src={src}
        alt={SITE.name}
        width={600}
        height={200}
        priority
        className={`w-auto shrink-0 object-contain ${
          logo.mode === 'mark' ? 'h-[190%]' : 'h-full'
        } ${plate ? 'rounded bg-white/95 p-1' : ''}`}
      />
    );

    if (logo.mode === 'mark') {
      return (
        <span className={`flex items-center gap-2 ${className}`}>
          {img}
          <span
            className={`font-display text-lg font-bold leading-none tracking-tight whitespace-nowrap ${textClassName}`}
          >
            {SITE.name}
          </span>
        </span>
      );
    }

    return <span className={`flex items-center ${className}`}>{img}</span>;
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 58 97"
        className="h-full w-auto shrink-0 text-accent"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 57.8844V38.6528L38.6116 0H49.0857L19.3451 57.8844H0Z" fill="currentColor" />
        <path d="M57.9146 38.5982V57.8298L19.3029 96.4825H8.82885L38.5694 38.5982H57.9146Z" fill="currentColor" />
      </svg>
      <span
        className={`font-display text-lg font-bold leading-none tracking-tight whitespace-nowrap ${textClassName}`}
      >
        {SITE.name}
      </span>
    </span>
  );
}
