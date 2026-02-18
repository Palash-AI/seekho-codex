import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  containerClassName?: string;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Input({ leftIcon, containerClassName, className, ...props }: InputProps) {
  return (
    <div
      className={cx(
        "flex h-12 items-center gap-2 rounded-seekhoInput border border-[rgba(255,255,255,0.08)] bg-[#1A1A1A] px-3",
        "focus-within:border-[#F50ACA] focus-within:shadow-[0_0_0_4px_rgba(245,10,202,0.18)]",
        "transition duration-seekhoFast ease-seekho",
        containerClassName
      )}
    >
      {leftIcon ? <span className="text-[rgba(255,255,255,0.48)]">{leftIcon}</span> : null}
      <input
        className={cx(
          "h-full w-full bg-transparent font-seekho text-body text-white placeholder:text-[rgba(255,255,255,0.48)]",
          "outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
