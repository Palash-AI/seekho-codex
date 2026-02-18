import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-5 text-button",
  sm: "h-10 px-4 text-button"
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-[linear-gradient(90deg,#7F09D6_0%,#F50ACA_100%)] enabled:shadow-[0_0_24px_rgba(245,10,202,0.45)]",
  secondary: "border border-[#F50ACA] text-[#F50ACA] bg-transparent",
  ghost: "text-white bg-transparent"
};

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex w-fit items-center justify-center gap-2 rounded-seekhoButton font-seekho font-semibold transition duration-seekhoMedium ease-seekho",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(245,10,202,0.35)]",
        "active:scale-[0.98]",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.4)] border-transparent shadow-none active:scale-100",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon ? <span className="grid place-items-center">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="grid place-items-center">{rightIcon}</span> : null}
    </button>
  );
}
