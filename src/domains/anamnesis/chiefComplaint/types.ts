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
