import { Mission } from "@/lib/types";

interface MissionCardProps {
  mission: Mission;
  onClick: () => void;
  compact?: boolean;
}

export function MissionCard({ mission, onClick, compact = false }: MissionCardProps) {
  const flagship = mission.isFlagship;

  return (
    <button
      className={`seekho-card w-full text-left transition hover:border-seekho-accent/50 ${
        flagship ? "shadow-flagship" : ""
      } ${compact ? "p-3" : "p-4"}`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`card-title ${flagship ? "text-[18px]" : ""}`}>{mission.title}</p>
          <p className="mt-1 text-[14px] text-seekho-secondary">{mission.description}</p>
        </div>
        {flagship ? (
          <span className="rounded-full border border-seekho-accent/50 bg-seekho-accent/10 px-2 py-1 text-[11px] font-medium text-seekho-accent">
            Most Chosen
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-[12px] text-seekho-muted">
        {mission.durationMin} min - {mission.xp} XP
      </p>
    </button>
  );
}
