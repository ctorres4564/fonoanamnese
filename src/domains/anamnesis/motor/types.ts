export interface MotorMilestone {
  status?: 'adquirido' | 'não adquirido' | 'em aquisição' | 'não informado' | 'não se aplica';
  acquisitionAgeMonths?: number;
  acquisitionAgeDescription?: string;
  acquisitionMode?: 'espontânea' | 'com estímulo' | 'após intervenção' | 'não informado';
  observations?: string;
}

export interface MotorRegression {
  hasRegression?: 'sim' | 'não' | 'não informado';
  lostSkill?: string;
  regressionAge?: number;
  onsetMode?: 'súbita' | 'gradual' | 'não informado' | 'outro';
  onsetModeOther?: string;
}

export interface PhysiotherapyHistory {
  hadPhysiotherapy?: 'sim' | 'não' | 'não informado';
  currentPhysiotherapy?: 'sim' | 'não' | 'não informado';
  reason?: string;
  period?: string;
  evolution?: string;
}

export interface MotorDevelopmentSection {
  milestones: {
    cervicalControl: MotorMilestone;
    rolling: MotorMilestone;
    sittingWithSupport: MotorMilestone;
    sittingWithoutSupport: MotorMilestone;
    crawlingOnBelly: MotorMilestone; // arrastar-se
    crawling: MotorMilestone; // engatinhar
    standingWithSupport: MotorMilestone;
    standingWithoutSupport: MotorMilestone;
    walkingWithSupport: MotorMilestone;
    walkingWithoutSupport: MotorMilestone;
    running: MotorMilestone;
    climbingStairs: MotorMilestone;
    descendingStairs: MotorMilestone;
    jumpingWithBothFeet: MotorMilestone;
    balance: MotorMilestone;
    globalMotorCoordination: MotorMilestone;
    fineMotorCoordination: MotorMilestone;
  };
  general: {
    ageAppropriateDevelopment?: 'sim' | 'não' | 'não informado';
    reportedMotorDelay?: 'sim' | 'não' | 'não informado';
    motorDelayDescription?: string;
    balanceDifficulty?: 'sim' | 'não' | 'não informado';
    frequentFalls?: 'sim' | 'não' | 'não informado';
    frequentFallsDescription?: string; // context/frequency/consequences
    runningDifficulty?: 'sim' | 'não' | 'não informado';
    stairsDifficulty?: 'sim' | 'não' | 'não informado';
    smallObjectsDifficulty?: 'sim' | 'não' | 'não informado';
    toolsDifficulty?: 'sim' | 'não' | 'não informado';
    manualPreference?: 'direita' | 'esquerda' | 'alternada' | 'ainda não definida' | 'não informado';
    manualPreferenceAge?: string;
    repetitiveMovements?: 'sim' | 'não' | 'não informado';
    repetitiveMovementsDescription?: string;
    usesMobilityDevice?: 'sim' | 'não' | 'não informado';
    mobilityDeviceType?: string;
    additionalObservations?: string;
  };
  regression: MotorRegression;
  physiotherapy: PhysiotherapyHistory;
}
