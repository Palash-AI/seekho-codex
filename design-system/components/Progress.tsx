export interface ProgressProps {
  value: number;
  max?: number;
  segmented?: boolean;
  segments?: number;
  className?: string;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Progress({
  value,
  max = 100,
  segmented = false,
  segments = 4,
  className
}: ProgressProps) {
  const safeValue = Math.max(0, Math.min(value, max));
  const percent = (safeValue / max) * 100;

  if (!segmented) {
    return (
      <div
        aria-label="progress"
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className={cx("h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)]", className)}
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#7F09D6_0%,#F50ACA_100%)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }

  return (
    <div
      className={cx("grid w-full", className)}
      style={{ gap: "4px", gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: segments }).map((_, index) => {
        const segmentProgress = ((index + 1) / segments) * 100;
        const filled = percent >= segmentProgress;
        return (
          <div
            className={`h-1.5 rounded-full ${
              filled
                ? "bg-[linear-gradient(90deg,#7F09D6_0%,#F50ACA_100%)]"
                : "bg-[rgba(255,255,255,0.12)]"
            }`}
            key={index}
          />
        );
      })}
    </div>
  );
}
