import type { InterviewData } from '../interview/types';
import type { ChiefComplaint } from '../chiefComplaint/types';
import type { PregnancyBirthNeonatalSection } from '../pregnancy/types';
import type { MotorDevelopmentSection } from '../motor/types';
import type { CommunicationDevelopmentSection } from '../communication/types';
import type { LanguageDevelopmentSection } from '../language/types';

export type AnamnesisStatus = 'draft' | 'in_progress' | 'review' | 'finalized' | 'corrected' | 'archived';

export type AnamnesisSection = 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other'; // Placeholder sections to be updated
// Actually, the prompt says: 
// 3. MODELO DE DADOS
// Atualize a estrutura de sections para incluir:
// - interviewData
// - chiefComplaint
// Então as seções reais agora são essas.

export type ActualAnamnesisSection = 'interviewData' | 'chiefComplaint' | 'pregnancyBirthNeonatal' | 'motorDevelopment' | 'communicationDevelopment' | 'languageDevelopment' | 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other';

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
    communicationDevelopment?: CommunicationDevelopmentSection;
    languageDevelopment?: LanguageDevelopmentSection;
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
