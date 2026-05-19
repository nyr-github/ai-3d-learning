import { ComponentPropsWithoutRef } from "react";

interface Tripo3DPromoLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: "button" | "link";
  size?: "sm" | "md" | "lg";
}

export function Tripo3DPromoLink({
  variant = "button",
  size = "md",
  className,
  ...props
}: Tripo3DPromoLinkProps) {
  const baseStyles =
    "inline-flex items-center gap-2 transition-all duration-200 font-semibold whitespace-nowrap";

  const variantStyles = {
    button:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-0.5",
    link: "text-(--ink-muted) hover:text-(--ink-primary)",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href="https://studio.tripo3d.ai?via=aivaded"
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
      {...props}
    >
      <svg className={iconSizes[size]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none">
          <path
            fill="currentColor"
            d="m3.54 3.59 2.587 4.407.002.003 5.152 8.792c.472.806 1.654.806 2.126 0l5-8.532h3.755l-6.781 11.554c-1.35 2.3-4.724 2.3-6.074 0L2.475 8.174C1.5 6.512 2.11 4.551 3.541 3.59"
          />
          <path
            fill="currentColor"
            opacity="0.8"
            d="M7.496 6.19h5.435l-2.263 3.89a.85.85 0 00.005.865l.901 1.51a.884.884 0 001.515-.006l3.674-6.259h5.914a3.485 3.485 0 00-3.5-3.19H5.624z"
          />
        </g>
      </svg>
      Create 3D with Tripo3D
    </a>
  );
}
