export type AnamnesisStatus = 'draft' | 'in_progress' | 'review' | 'finalized' | 'corrected' | 'archived';

export type AnamnesisSection = 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other'; // Placeholder sections to be updated
// Actually, the prompt says: 
// 3. MODELO DE DADOS
// Atualize a estrutura de sections para incluir:
// - interviewData
// - chiefComplaint
// Então as seções reais agora são essas.

export type ActualAnamnesisSection = 'interviewData' | 'chiefComplaint' | 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other';
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
    [key: string]: any; // allowing other sections for future compatibility if needed, though strictly typed for these two.
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
