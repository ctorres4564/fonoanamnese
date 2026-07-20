import type { ActualAnamnesisSection } from './types'

export const ACTIVE_ANAMNESIS_SECTIONS = [
  { id: 'interviewData', label: 'Dados da Entrevista' },
  { id: 'chiefComplaint', label: 'Queixa Principal' },
  { id: 'pregnancyBirthNeonatal', label: 'Gestação, Parto e Neonatal' },
  { id: 'motorDevelopment', label: 'Desenvolvimento Motor' },
  { id: 'communicationDevelopment', label: 'Desenvolvimento da Linguagem' },
  { id: 'healthHistory', label: 'Histórico de Saúde' },
  { id: 'familyHistory', label: 'Histórico Familiar' },
  { id: 'childRoutine', label: 'Rotina da Criança' },
] as const satisfies ReadonlyArray<{ id: ActualAnamnesisSection; label: string }>

export const ACTIVE_ANAMNESIS_SECTION_IDS = ACTIVE_ANAMNESIS_SECTIONS.map(
  (section) => section.id,
) as ActualAnamnesisSection[]

/**
 * Chaves preservadas somente para leitura e compatibilidade com anamneses antigas.
 * Elas não participam mais do editor, progresso, revisão ou novos relatórios.
 */
export const LEGACY_ANAMNESIS_SECTION_IDS: ActualAnamnesisSection[] = [
  'languageDevelopment',
  'speechDevelopment',
]

export function isActiveAnamnesisSection(
  section: ActualAnamnesisSection,
): section is (typeof ACTIVE_ANAMNESIS_SECTIONS)[number]['id'] {
  return ACTIVE_ANAMNESIS_SECTION_IDS.includes(section)
}
