import Image from 'next/image';
import { SITE } from '@/lib/constants';

/* Brand logo, driven by SITE.logo (written by scripts/client/apply.mjs).

   mode 'image'    — the client's own artwork. A colour emblem (flat: false) is
                     illegible on the dark footer, so it sits on a light plate
                     there instead of being recoloured.
   no SITE.logo    — the template's own mark plus SITE.name as a wordmark. */
export default function Logo({
  className = 'h-7',
  textClassName = 'text-primary',
}: {
  className?: string;
  textClassName?: string;
}) {
  const logo = SITE.logo as
    | { mode?: string; flat?: boolean; src?: string; srcDark?: string }
    | undefined;
  const onDark = textClassName.includes('white');

  if (logo?.src) {
    const src = (onDark && logo.srcDark) || logo.src;
    const needsPlate = onDark && logo.flat === false;
    return (
      <span
        className={`flex items-center ${className} ${
          needsPlate ? 'rounded-md bg-white px-2 py-1' : ''
        }`}
      >
        <Image
          src={src}
          alt={SITE.name}
          width={720}
          height={200}
          priority
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 58 97"
        className="h-full w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 57.8844V38.6528L38.6116 0H49.0857L19.3451 57.8844H0Z" fill="#FF5700" />
        <path d="M57.9146 38.5982V57.8298L19.3029 96.4825H8.82885L38.5694 38.5982H57.9146Z" fill="#FF5700" />
      </svg>
      <span
        className={`font-display text-lg font-bold leading-none tracking-tight whitespace-nowrap ${textClassName}`}
      >
        {SITE.name}
      </span>
    </span>
  );
}
