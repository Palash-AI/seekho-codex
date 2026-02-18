export type StepStateType = "FREE" | "PREVIEW" | "LOCKED";

export interface MissionStep {
  id: string;
  title: string;
  lengthMin: number;
  stateType: StepStateType;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  xp: number;
  isFlagship?: boolean;
  steps: MissionStep[];
}

export type LevelType = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface PersistedState {
  hasSeenMissionEntry: boolean;
  hasTrial: boolean;
  activeMissionId: string | null;
  activeStepIndex: number;
  completedSteps: Record<string, number>;
  streakCount: number;
  lastActiveDate: string;
  selectedMissionId: string | null;
  selectedLevel: LevelType | null;
}

export type AnalyticsEventName =
  | "Mission_Selected"
  | "Mission_Generated"
  | "Mission_Started"
  | "Step_Completed"
  | "Preview_Viewed"
  | "Paywall_Shown"
  | "Trial_Started"
  | "Mission_Completed"
  | "Streak_Incremented"
  | "AI_Practice_Clicked"
  | "AI_LearnNew_Clicked";

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventName;
  payload?: Record<string, unknown>;
  timestamp: string;
}

export interface CompleteStepResult {
  nextStepIndex: number;
  completedCount: number;
  missionFinished: boolean;
  streakIncremented: boolean;
  streakCount: number;
}
