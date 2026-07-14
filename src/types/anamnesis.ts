export type AnamnesisStatus = 'draft' | 'in_progress' | 'review' | 'finalized' | 'corrected' | 'archived';

export type AnamnesisSection = 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other'; // Placeholder sections to be updated
// Actually, the prompt says: 
// 3. MODELO DE DADOS
// Atualize a estrutura de sections para incluir:
// - interviewData
// - chiefComplaint
// Então as seções reais agora são essas.

export type ActualAnamnesisSection = 'interviewData' | 'chiefComplaint' | 'pregnancyBirthNeonatal' | 'motorDevelopment' | 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other';
// Wait, the prompt said:
// Não implemente outras seções clínicas. OBJETIVO: Adicionar as duas primeiras seções clínicas reais da anamnese: 1. Dados da entrevista 2. Queixa principal
// 6. INTEGRAÇÃO COM O WIZARD: Adicione as duas seções à navegação. Ordem: 1. Dados da entrevista 2. Queixa principal

export interface InterviewData {
  interviewDate: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  location: 'consultório' | 'clínica' | 'domicílio' | 'escola' | 'hospital' | 'remoto' | 'outro';
  locationDescription?: string;
  interviewee: string;
  relationship: string;
  childPresent?: boolean;
  otherParticipants?: string;
  informationQuality?: 'adequada' | 'parcialmente adequada' | 'limitada' | 'não foi possível determinar';
  informationLimitationReason?: string;
  observations?: string;
  modality?: 'presencial' | 'domiciliar' | 'remoto' | 'híbrido' | 'outro';
  modalityAddress?: string;
  modalityPlatform?: string;
}

export interface ChiefComplaint {
  complaint: string;
  whoNoticed?: string;
  approximateAgeNoticed?: number;
  onsetMode?: 'súbito' | 'gradual' | 'presente desde o início do desenvolvimento' | 'não informado' | 'outro';
  onsetModeDescription?: string;
  duration?: string;
  evolution?: 'melhorando' | 'estável' | 'piorando' | 'oscilante' | 'não informado';
  situationsOccur?: string;
  functionalImpacts?: Array<'comunicação familiar' | 'escola' | 'socialização' | 'alimentação' | 'autonomia' | 'comportamento' | 'participação em atividades' | 'outro'>;
  functionalImpactsOther?: string;
  familyExpectation?: string;
  referralSource?: 'família' | 'escola' | 'pediatria' | 'neurologia' | 'otorrinolaringologia' | 'psicologia' | 'terapia ocupacional' | 'outro fonoaudiólogo' | 'outro profissional' | 'procura espontânea';
  referralProfessionalName?: string;
  additionalObservations?: string;
}

export interface PregnancyHistory {
  plannedPregnancy?: 'sim' | 'não' | 'não informado';
  prenatalCare?: 'sim' | 'não' | 'não informado';
  prenatalConsultations?: number;
  maternalAge?: number;
  pregnancyComplications?: 'sim' | 'não' | 'não informado';
  pregnancyComplicationsDescription?: string;
  infections?: 'sim' | 'não' | 'não informado';
  infectionsDescription?: string;
  hypertension?: 'sim' | 'não' | 'não informado';
  gestationalDiabetes?: 'sim' | 'não' | 'não informado';
  bleeding?: 'sim' | 'não' | 'não informado';
  medications?: 'sim' | 'não' | 'não informado';
  medicationsDescription?: string;
  alcoholExposure?: 'sim' | 'não' | 'não informado';
  tobaccoExposure?: 'sim' | 'não' | 'não informado';
  otherSubstances?: 'sim' | 'não' | 'não informado';
  otherSubstancesDescription?: string;
  hospitalizations?: 'sim' | 'não' | 'não informado';
  hospitalizationsDescription?: string;
  fetalDistress?: 'sim' | 'não' | 'não informado';
  alteredExams?: 'sim' | 'não' | 'não informado';
  alteredExamsDescription?: string;
  additionalObservations?: string;
}

export interface BirthHistory {
  deliveryType?: 'vaginal' | 'cesárea' | 'fórceps' | 'parto instrumentado' | 'não informado' | 'outro';
  deliveryTypeOther?: string;
  gestationalAgeWeeks?: number;
  prematurity?: 'sim' | 'não' | 'não informado';
  prematurityClassification?: string;
  birthWeight?: number;
  birthLength?: number;
  headCircumference?: number;
  apgar1?: number;
  apgar5?: number;
  birthComplications?: 'sim' | 'não' | 'não informado';
  resuscitationNeeded?: 'sim' | 'não' | 'não informado';
  resuscitationDescription?: string;
  fetalDistress?: 'sim' | 'não' | 'não informado';
  oxygenNeeded?: 'sim' | 'não' | 'não informado';
  intubationNeeded?: 'sim' | 'não' | 'não informado';
  nicuAdmission?: 'sim' | 'não' | 'não informado';
  nicuDurationAndReason?: string;
  hospitalizationTime?: string;
  observations?: string;
}

export interface NeonatalHistory {
  jaundice?: 'sim' | 'não' | 'não informado';
  phototherapy?: 'sim' | 'não' | 'não informado';
  mechanicalVentilation?: 'sim' | 'não' | 'não informado';
  intubation?: 'sim' | 'não' | 'não informado';
  tubeFeeding?: 'sim' | 'não' | 'não informado';
  tubeTypeAndDuration?: string;
  neonatalInfections?: 'sim' | 'não' | 'não informado';
  neonatalInfectionsDescription?: string;
  seizures?: 'sim' | 'não' | 'não informado';
  seizuresFrequencyAndConduct?: string;
  neurologicalAlterations?: 'sim' | 'não' | 'não informado';
  suctionDifficulty?: 'sim' | 'não' | 'não informado';
  feedingDifficulty?: 'sim' | 'não' | 'não informado';
  lowWeightGain?: 'sim' | 'não' | 'não informado';
  newbornHearingScreening?: 'passou' | 'falhou' | 'inconclusivo' | 'não realizado' | 'não informado';
  hearingScreeningResult?: string;
  hearingScreeningRetestNeeded?: string;
  tongueTieTest?: 'alterado' | 'normal' | 'não realizado' | 'não informado';
  tongueTieTestResult?: string;
  newbornBloodSpotTest?: 'alterado' | 'normal' | 'não realizado' | 'não informado';
  bloodSpotTestResult?: string;
  otherComplications?: string;
  observations?: string;
}

export interface PregnancyBirthNeonatalSection {
  pregnancy: PregnancyHistory;
  birth: BirthHistory;
  neonatal: NeonatalHistory;
}

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


export interface AnamnesisProgress {
  currentSection: ActualAnamnesisSection;
  completedSections: ActualAnamnesisSection[];
  completionPercentage: number; // 0 to 100
}

export type AutosaveState = 'idle' | 'saving' | 'saved' | 'error';

export interface Anamnesis {
  id?: string;
  patientId: string;
  professionalId: string;
  status: AnamnesisStatus;
  currentSection: ActualAnamnesisSection;
  completedSections: ActualAnamnesisSection[];
  completionPercentage: number;
  version: number;
  isArchived: boolean;
  
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy: string;
  updatedBy: string;
  finalizedAt?: string | Date | null;

  sections: {
    interviewData?: InterviewData;
    chiefComplaint?: ChiefComplaint;
    pregnancyBirthNeonatal?: PregnancyBirthNeonatalSection;
    motorDevelopment?: MotorDevelopmentSection;
    [key: string]: any; 
  };
}

export interface AnamnesisVersion {
  id?: string;
  anamnesisId: string;
  version: number;
  patientId: string;
  professionalId: string;
  status: AnamnesisStatus;
  data: Omit<Anamnesis, 'id'>; 
  createdBy: string;
  createdAt: string | Date;
  changeDescription?: string;
}
