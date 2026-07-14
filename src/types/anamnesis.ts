export type AnamnesisStatus = 'draft' | 'in_progress' | 'review' | 'finalized' | 'corrected' | 'archived';

export type AnamnesisSection = 'identification' | 'clinical_history' | 'development' | 'social_history' | 'other'; // Placeholder sections

export interface AnamnesisProgress {
  currentSection: AnamnesisSection;
  completedSections: AnamnesisSection[];
  completionPercentage: number; // 0 to 100
}

export type AutosaveState = 'idle' | 'saving' | 'saved' | 'error';

export interface Anamnesis {
  id?: string;
  patientId: string;
  professionalId: string;
  status: AnamnesisStatus;
  currentSection: AnamnesisSection;
  completedSections: AnamnesisSection[];
  completionPercentage: number;
  version: number;
  isArchived: boolean;
  
  // Timestamps and tracking
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy: string;
  updatedBy: string;
  finalizedAt?: string | Date | null;

  // Generic sections block for now
  sections: Record<string, any>;
}

export interface AnamnesisVersion {
  id?: string;
  anamnesisId: string;
  version: number;
  patientId: string;
  professionalId: string;
  status: AnamnesisStatus;
  data: Omit<Anamnesis, 'id'>; // Snapshot
  createdBy: string;
  createdAt: string | Date;
  changeDescription?: string;
}
