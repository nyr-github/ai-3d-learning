import { RotateCw, RotateCcw, Check } from "lucide-react";

/** Auto Rotate Icon */
export function RotateIcon() {
  return <RotateCw size={14} />;
}

/** Reset View Icon */
export function ResetIcon() {
  return <RotateCcw size={14} />;
}

/** Check Complete Icon */
export function CheckIcon() {
  return <Check size={10} strokeWidth={2.2} />;
}

/** Cell Loading Animation Icon */
export function CellRingIcon() {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80">
      <defs>
        <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9bcf83" />
          <stop offset="100%" stopColor="#5c7a8a" />
        </linearGradient>
      </defs>
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="6"
        fill="none"
      />
      <circle
        cx="40"
        cy="40"
        r="32"
        stroke="url(#ring)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="60"
        transform="rotate(-90 40 40)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-90 40 40"
          to="270 40 40"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="40" cy="40" r="9" fill="#5c2a8c" opacity="0.7" />
      <circle cx="28" cy="32" r="2.5" fill="#f1c40f" />
      <circle cx="52" cy="30" r="2" fill="#e67e22" />
      <circle cx="52" cy="50" r="2.4" fill="#1e88e5" />
      <circle cx="28" cy="52" r="2.2" fill="#c0392b" />
    </svg>
  );
}

/** Brand Logo Icon */
export function BrandLogoIcon() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36">
      <defs>
        <radialGradient id="bm" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#c8e6a0" />
          <stop offset="55%" stopColor="#7fb069" />
          <stop offset="100%" stopColor="#3f6b3a" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#bm)" />
      <circle cx="24" cy="24" r="7" fill="#5c2a8c" opacity="0.85" />
      <circle cx="14" cy="16" r="2.4" fill="#f1c40f" opacity="0.85" />
      <circle cx="34" cy="14" r="1.8" fill="#e67e22" opacity="0.85" />
      <circle cx="34" cy="32" r="2.2" fill="#1e88e5" opacity="0.85" />
      <circle cx="14" cy="34" r="1.9" fill="#c0392b" opacity="0.85" />
    </svg>
  );
}
