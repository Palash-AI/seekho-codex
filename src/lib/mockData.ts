import { Mission } from "@/lib/types";

const stepsTemplate = [
  { suffix: "foundation", lengthMin: 4, stateType: "FREE" as const },
  { suffix: "practice", lengthMin: 5, stateType: "FREE" as const },
  { suffix: "confidence-preview", lengthMin: 4, stateType: "PREVIEW" as const },
  { suffix: "final-drill", lengthMin: 5, stateType: "LOCKED" as const }
];

function makeMission(
  id: string,
  title: string,
  description: string,
  durationMin: number,
  xp: number,
  isFlagship = false
): Mission {
  return {
    id,
    title,
    description,
    durationMin,
    xp,
    isFlagship,
    steps: stepsTemplate.map((step, index) => ({
      id: `${id}-${step.suffix}`,
      title:
        index === 0
          ? "Strong basics"
          : index === 1
            ? "Real practice"
            : index === 2
              ? "Preview challenge"
              : "Final execution",
      lengthMin: step.lengthMin,
      stateType: step.stateType
    }))
  };
}

export const missions: Mission[] = [
  makeMission(
    "english-speaking",
    "English Speaking",
    "Roz ke real-life conversations confidently bolna",
    17,
    120,
    true
  ),
  makeMission(
    "crack-interview",
    "Crack Interview",
    "HR aur role-fit answers ko sharp banana",
    16,
    110
  ),
  makeMission(
    "sales-mastery",
    "Sales Mastery",
    "Pitch, objection aur closing better karo",
    15,
    100
  ),
  makeMission(
    "freelance-start",
    "Freelance Start",
    "Client find, proposal bhejo, delivery system build karo",
    18,
    130
  ),
  makeMission(
    "personal-brand",
    "Personal Branding",
    "Online identity aur trust signals banane ka framework",
    15,
    95
  ),
  makeMission(
    "ai-tools-job",
    "AI Tools for Job",
    "Daily work speed up karne ke practical workflows",
    16,
    105
  )
];

export const intentClusters = missions.map((mission) => ({
  id: mission.id,
  title: mission.title,
  description: mission.description,
  hero: mission.id === "english-speaking" || mission.id === "crack-interview"
}));

export const levels = [
  {
    id: "BEGINNER" as const,
    title: "Beginner",
    subtitle: "Bilkul start se chalna hai"
  },
  {
    id: "INTERMEDIATE" as const,
    title: "Intermediate",
    subtitle: "Basics aate hain, polish chahiye"
  },
  {
    id: "ADVANCED" as const,
    title: "Advanced",
    subtitle: "Fast growth, direct challenge mode"
  }
];

export function getMissionById(missionId: string | null) {
  if (!missionId) return null;
  return missions.find((mission) => mission.id === missionId) ?? null;
}
