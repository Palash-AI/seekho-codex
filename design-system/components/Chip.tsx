import { ButtonHTMLAttributes } from "react";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  withAccentBorder?: boolean;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Chip({
  selected = false,
  withAccentBorder = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      className={cx(
        "inline-flex h-8 items-center justify-center rounded-seekhoChip px-3 font-seekho text-body transition duration-seekhoFast ease-seekho",
        selected
          ? "bg-[rgba(245,10,202,0.16)] text-white"
          : "bg-[#1A1A1A] text-[rgba(255,255,255,0.72)]",
        selected && withAccentBorder ? "border border-[#F50ACA]" : "border border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
