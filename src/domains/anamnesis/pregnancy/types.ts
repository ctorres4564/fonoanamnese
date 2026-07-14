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
