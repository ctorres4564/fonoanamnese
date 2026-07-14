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
