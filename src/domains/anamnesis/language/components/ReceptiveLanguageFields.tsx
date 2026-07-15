import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { LanguageSkillField } from './LanguageSkillField'
import { YES_NO_OPTIONS } from '../constants'

export function ReceptiveLanguageFields() {
  const { register } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">1. Linguagem Receptiva (Compreensão)</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Compreensão Básica</h4>
            <LanguageSkillField
              label="Atende ao nome"
              name="languageDevelopment.receptiveLanguage.respondsToName"
            />
            <LanguageSkillField
              label="Compreende palavras familiares"
              name="languageDevelopment.receptiveLanguage.understandsFamiliarWords"
            />
            <LanguageSkillField
              label="Identifica pessoas familiares"
              name="languageDevelopment.receptiveLanguage.identifiesFamiliarPeople"
            />
            <LanguageSkillField
              label="Identifica objetos"
              name="languageDevelopment.receptiveLanguage.identifiesObjects"
            />
            <LanguageSkillField
              label="Identifica partes do corpo"
              name="languageDevelopment.receptiveLanguage.identifiesBodyParts"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Compreensão de Ordens</h4>
            <LanguageSkillField
              label="Compreende ordens simples"
              name="languageDevelopment.receptiveLanguage.understandsSimpleCommands"
            />
            <LanguageSkillField
              label="Compreende ordens com duas etapas"
              name="languageDevelopment.receptiveLanguage.understandsTwoStepCommands"
            />
            <LanguageSkillField
              label="Compreende ordens com três ou mais etapas"
              name="languageDevelopment.receptiveLanguage.understandsComplexCommands"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Compreensão de Perguntas</h4>
            <LanguageSkillField
              label="Compreende perguntas com 'o quê'"
              name="languageDevelopment.receptiveLanguage.understandsWhat"
            />
            <LanguageSkillField
              label="Compreende perguntas com 'quem'"
              name="languageDevelopment.receptiveLanguage.understandsWho"
            />
            <LanguageSkillField
              label="Compreende perguntas com 'onde'"
              name="languageDevelopment.receptiveLanguage.understandsWhere"
            />
            <LanguageSkillField
              label="Compreende perguntas com 'quando'"
              name="languageDevelopment.receptiveLanguage.understandsWhen"
            />
            <LanguageSkillField
              label="Compreende perguntas com 'por quê'"
              name="languageDevelopment.receptiveLanguage.understandsWhy"
            />
            <LanguageSkillField
              label="Compreende perguntas com 'como'"
              name="languageDevelopment.receptiveLanguage.understandsHow"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Conceitos</h4>
            <LanguageSkillField
              label="Compreende conceitos espaciais"
              name="languageDevelopment.receptiveLanguage.understandsSpatial"
            />
            <LanguageSkillField
              label="Compreende conceitos temporais"
              name="languageDevelopment.receptiveLanguage.understandsTemporal"
            />
            <LanguageSkillField
              label="Compreende conceitos de quantidade"
              name="languageDevelopment.receptiveLanguage.understandsQuantity"
            />
            <LanguageSkillField
              label="Compreende opostos"
              name="languageDevelopment.receptiveLanguage.understandsOpposites"
            />
            <LanguageSkillField
              label="Compreende ações"
              name="languageDevelopment.receptiveLanguage.understandsActions"
            />
            <LanguageSkillField
              label="Compreende funções dos objetos"
              name="languageDevelopment.receptiveLanguage.understandsFunctions"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Discurso e Contexto</h4>
            <LanguageSkillField
              label="Compreende histórias curtas"
              name="languageDevelopment.receptiveLanguage.understandsShortStories"
            />
            <LanguageSkillField
              label="Compreende sequências de acontecimentos"
              name="languageDevelopment.receptiveLanguage.understandsSequences"
            />
            <LanguageSkillField
              label="Compreende linguagem não literal"
              name="languageDevelopment.receptiveLanguage.understandsNonLiteral"
            />
            <LanguageSkillField
              label="Compreende piadas ou ironia (se compatível)"
              name="languageDevelopment.receptiveLanguage.understandsJokesIrony"
            />
            <LanguageSkillField
              label="Compreende instruções em ambiente com distrações"
              name="languageDevelopment.receptiveLanguage.understandsInDistractions"
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700 mb-4">
              Necessidades Específicas na Receptiva
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'needsRepetition', label: 'Necessita de repetição' },
                { key: 'needsSlowerSpeech', label: 'Necessita de fala mais lenta' },
                { key: 'needsGestures', label: 'Necessita de gestos' },
                { key: 'needsVisualSupport', label: 'Necessita de apoio visual' },
                { key: 'needsDemonstration', label: 'Necessita de demonstração' },
                { key: 'needsSimplifiedLanguage', label: 'Necessita de redução da complexidade' },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.label}
                  </label>
                  <select
                    {...register(`languageDevelopment.receptiveLanguage.${item.key}`)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {YES_NO_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700 mb-4">Campos Complementares</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  key: 'bestComprehensionSituations',
                  label: 'Situações em que a compreensão é melhor',
                },
                {
                  key: 'worstComprehensionSituations',
                  label: 'Situações em que a compreensão é mais difícil',
                },
                { key: 'homeVsSchoolDifference', label: 'Diferença entre casa e escola' },
                { key: 'familiarPeopleComprehension', label: 'Compreensão com pessoas familiares' },
                {
                  key: 'unfamiliarPeopleComprehension',
                  label: 'Compreensão com pessoas desconhecidas',
                },
                {
                  key: 'noisyEnvironmentComprehension',
                  label: 'Compreensão em ambientes ruidosos',
                },
                { key: 'familyPerception', label: 'Percepção da família sobre a compreensão' },
                { key: 'examples', label: 'Exemplos relatados' },
                { key: 'professionalObservations', label: 'Observações do profissional' },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.label}
                  </label>
                  <textarea
                    {...register(`languageDevelopment.receptiveLanguage.${item.key}`)}
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
