import { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "hero";

export interface CardProps {
  variant?: CardVariant;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-[#111111] text-white border border-[rgba(255,255,255,0.08)] shadow-[0_4px_12px_rgba(0,0,0,0.35)]",
  elevated: "bg-[#1A1A1A] text-white border border-[rgba(255,255,255,0.08)] shadow-[0_8px_24px_rgba(0,0,0,0.5)]",
  hero: "bg-[linear-gradient(90deg,#7F09D6_0%,#F50ACA_50%,#D3AF37_100%)] text-white border border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
};

export function Card({
  variant = "default",
  header,
  body,
  footer,
  children,
  className
}: CardProps) {
  return (
    <section className={cx("rounded-seekhoCard p-4 font-seekho", variantClasses[variant], className)}>
      <div className="flex flex-col gap-3">
        {header ? <div>{header}</div> : null}
        {body ? <div>{body}</div> : children ? <div>{children}</div> : null}
        {footer ? <div>{footer}</div> : null}
      </div>
    </section>
  );
}
