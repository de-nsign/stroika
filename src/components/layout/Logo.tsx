import { SITE } from '@/lib/constants';

/* Brand logo: orange mark + "Heavy Rentals" wordmark.
   Rendered as JSX (not an <img>) so the brand name always reflects SITE.name. */
export default function Logo({
  className = 'h-7',
  textClassName = 'text-primary',
}: {
  className?: string;
  textClassName?: string;
}) {
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
