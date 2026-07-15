import type { 
  SpeechDevelopmentEvolution, 
  SpeechEvolutionStatus, 
  SpeechOnsetMode, 
  IntelligibilityLevel,
  PositionInWord,
  PresenceStatus,
  SoundClassStatus,
  FrequencyScale,
  RateScale,
  RhythmScale,
  PrecisionScale,
  SpeechSampleType 
} from './types';

export const SPEECH_DEVELOPMENT_EVOLUTION_OPTIONS: { value: SpeechDevelopmentEvolution; label: string }[] = [
  { value: 'dentro_do_esperado', label: 'Dentro do esperado' },
  { value: 'tardio', label: 'Tardio' },
  { value: 'irregular', label: 'Irregular' },
  { value: 'houve_regressao', label: 'Houve regressão' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const SPEECH_EVOLUTION_STATUS_OPTIONS: { value: SpeechEvolutionStatus; label: string }[] = [
  { value: 'melhorando', label: 'Melhorando' },
  { value: 'estavel', label: 'Estável' },
  { value: 'piorando', label: 'Piorando' },
  { value: 'oscilante', label: 'Oscilante' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const SPEECH_ONSET_MODE_OPTIONS: { value: SpeechOnsetMode; label: string }[] = [
  { value: 'gradual', label: 'Gradual' },
  { value: 'subito', label: 'Súbito' },
  { value: 'presente_desde_inicio', label: 'Presente desde o início da fala' },
  { value: 'nao_informado', label: 'Não informado' },
  { value: 'outro', label: 'Outro' },
];

export const INTELLIGIBILITY_LEVEL_OPTIONS: { value: IntelligibilityLevel; label: string }[] = [
  { value: 'totalmente_inteligivel', label: 'Totalmente inteligível' },
  { value: 'predominantemente_inteligivel', label: 'Predominantemente inteligível' },
  { value: 'parcialmente_inteligivel', label: 'Parcialmente inteligível' },
  { value: 'pouco_inteligivel', label: 'Pouco inteligível' },
  { value: 'nao_inteligivel', label: 'Não inteligível' },
  { value: 'nao_observado', label: 'Não observado' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const FREQUENCY_SCALE_OPTIONS: { value: FrequencyScale; label: string }[] = [
  { value: 'frequentemente', label: 'Frequentemente' },
  { value: 'as_vezes', label: 'Às vezes' },
  { value: 'raramente', label: 'Raramente' },
  { value: 'nunca', label: 'Nunca' },
  { value: 'nao_observado', label: 'Não observado' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const PRESENCE_STATUS_OPTIONS: { value: PresenceStatus; label: string }[] = [
  { value: 'presente', label: 'Presente' },
  { value: 'ausente', label: 'Ausente' },
  { value: 'incerto', label: 'Incerto' },
  { value: 'nao_observado', label: 'Não observado' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const SOUND_CLASS_STATUS_OPTIONS: { value: SoundClassStatus; label: string }[] = [
  { value: 'aparentemente_adequada', label: 'Aparentemente adequada' },
  { value: 'dificuldade_percebida', label: 'Dificuldade percebida' },
  { value: 'variavel', label: 'Variável' },
  { value: 'nao_observado', label: 'Não observado' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const POSITION_IN_WORD_OPTIONS: { value: PositionInWord; label: string }[] = [
  { value: 'inicio', label: 'Início' },
  { value: 'meio', label: 'Meio' },
  { value: 'final', label: 'Final' },
  { value: 'variavel', label: 'Variável' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const REPORTED_SPEECH_ERROR_TYPES = [
  { value: 'substituicao', label: 'Substituição de sons' },
  { value: 'omissao', label: 'Omissão de sons' },
  { value: 'distorcao', label: 'Distorção de sons' },
  { value: 'acrescimo', label: 'Acréscimo de sons' },
  { value: 'simplificacao', label: 'Simplificação de palavras' },
  { value: 'inversao', label: 'Inversão de sons ou sílabas' },
  { value: 'infantilizada', label: 'Fala infantilizada' },
  { value: 'inconsistente', label: 'Produção inconsistente' },
  { value: 'iniciar', label: 'Dificuldade para iniciar a palavra' },
  { value: 'longas', label: 'Dificuldade com palavras longas' },
  { value: 'encontros', label: 'Dificuldade com encontros consonantais' },
  { value: 'sons_especificos', label: 'Dificuldade com determinados sons' },
  { value: 'imprecisa', label: 'Fala imprecisa' },
  { value: 'articulacao_reduzida', label: 'Articulação reduzida' },
  { value: 'nasalidade', label: 'Nasalidade percebida' },
  { value: 'outra', label: 'Outra' },
];

export const PHONOLOGICAL_PATTERNS = [
  { value: 'reducao_encontro_consonantal', label: 'Redução de encontro consonantal' },
  { value: 'simplificacao_liquidas', label: 'Simplificação de líquidas' },
  { value: 'posteriorizacao', label: 'Posteriorização' },
  { value: 'anteriorizacao', label: 'Anteriorização' },
  { value: 'ensurdecimento', label: 'Ensurdecimento' },
  { value: 'sonorizacao', label: 'Sonorização' },
  { value: 'omissao_consoante_final', label: 'Omissão de consoante final' },
  { value: 'harmonia_consonantal', label: 'Harmonia consonantal' },
  { value: 'reducao_silabica', label: 'Redução silábica' },
  { value: 'assimilacao', label: 'Assimilação' },
  { value: 'substituicoes_variaveis', label: 'Substituições variáveis' },
  { value: 'outros_padroes', label: 'Outros padrões percebidos' },
];

export const SOUND_CLASSES = [
  { value: 'vogais', label: 'Vogais' },
  { value: 'plosivas', label: 'Plosivas' },
  { value: 'fricativas', label: 'Fricativas' },
  { value: 'africadas', label: 'Africadas' },
  { value: 'nasais', label: 'Nasais' },
  { value: 'liquidas', label: 'Líquidas' },
  { value: 'vibrantes', label: 'Vibrantes' },
  { value: 'encontros_consonantais', label: 'Encontros consonantais' },
  { value: 'silabas_complexas', label: 'Sílabas complexas' },
];

export const RATE_SCALE_OPTIONS: { value: RateScale; label: string }[] = [
  { value: 'adequada', label: 'Adequada' },
  { value: 'aumentada', label: 'Aumentada' },
  { value: 'reduzida', label: 'Reduzida' },
  { value: 'variavel', label: 'Variável' },
  { value: 'nao_observada', label: 'Não observada' },
  { value: 'nao_informada', label: 'Não informada' },
];

export const RHYTHM_SCALE_OPTIONS: { value: RhythmScale; label: string }[] = [
  { value: 'aparentemente_adequado', label: 'Aparentemente adequado' },
  { value: 'irregular', label: 'Irregular' },
  { value: 'silabado', label: 'Silabado' },
  { value: 'acelerado', label: 'Acelerado' },
  { value: 'reduzido', label: 'Reduzido' },
  { value: 'nao_observado', label: 'Não observado' },
  { value: 'nao_informado', label: 'Não informado' },
];

export const PRECISION_SCALE_OPTIONS: { value: PrecisionScale; label: string }[] = [
  { value: 'adequada', label: 'Adequada' },
  { value: 'parcialmente_adequada', label: 'Parcialmente adequada' },
  { value: 'reduzida', label: 'Reduzida' },
  { value: 'variavel', label: 'Variável' },
  { value: 'nao_observada', label: 'Não observada' },
  { value: 'nao_informada', label: 'Não informada' },
];

export const SPEECH_SAMPLE_TYPE_OPTIONS: { value: SpeechSampleType; label: string }[] = [
  { value: 'conversa_espontanea', label: 'Conversa espontânea' },
  { value: 'nomeacao', label: 'Nomeação' },
  { value: 'repeticao', label: 'Repetição' },
  { value: 'descricao_imagem', label: 'Descrição de imagem' },
  { value: 'leitura', label: 'Leitura' },
  { value: 'outra', label: 'Outra' },
];

export const YES_NO_INFORMED_OPTIONS = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'nao_informado', label: 'Não informado' },
];
