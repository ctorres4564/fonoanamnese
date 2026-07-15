import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LanguageSkillField } from './LanguageSkillField';
import { YES_NO_OPTIONS } from '../constants';

export function NarrativeDevelopmentFields() {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">5. Discurso e Narrativa</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Habilidades Narrativas</h4>
            <LanguageSkillField label="Relata fatos em sequência" name="languageDevelopment.narrativeDevelopment.reportsEventsInSequence" />
            <LanguageSkillField label="Organiza começo, meio e fim" name="languageDevelopment.narrativeDevelopment.organizesBeginningMiddleEnd" />
            <LanguageSkillField label="Mantém personagens e referências" name="languageDevelopment.narrativeDevelopment.maintainsCharactersAndReferences" />
            <LanguageSkillField label="Informa contexto" name="languageDevelopment.narrativeDevelopment.providesContext" />
            <LanguageSkillField label="Relata causa e consequência" name="languageDevelopment.narrativeDevelopment.reportsCauseAndEffect" />
            <LanguageSkillField label="Utiliza marcadores temporais" name="languageDevelopment.narrativeDevelopment.usesTemporalMarkers" />
            <LanguageSkillField label="Descreve acontecimentos passados" name="languageDevelopment.narrativeDevelopment.describesPastEvents" />
            <LanguageSkillField label="Antecipa acontecimentos" name="languageDevelopment.narrativeDevelopment.anticipatesEvents" />
            <LanguageSkillField label="Reconta histórias" name="languageDevelopment.narrativeDevelopment.retellsStories" />
            <LanguageSkillField label="Inventa histórias" name="languageDevelopment.narrativeDevelopment.inventsStories" />
            <LanguageSkillField label="Mantém coerência" name="languageDevelopment.narrativeDevelopment.maintainsCoherence" />
            <LanguageSkillField label="Apresenta informações suficientes" name="languageDevelopment.narrativeDevelopment.providesSufficientInformation" />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700 mb-4">Características do Discurso</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'needsSupportQuestions', label: 'Necessita de perguntas de apoio?' },
                { key: 'losesTopic', label: 'Perde o tema?' },
                { key: 'includesExcessiveDetails', label: 'Inclui detalhes excessivos?' },
                { key: 'hasUninformativeDiscourse', label: 'Apresenta discurso pouco informativo?' },
                { key: 'hasDisorganizedDiscourse', label: 'Apresenta discurso desorganizado?' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <select
                    {...register(`languageDevelopment.narrativeDevelopment.${item.key}`)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações e Exemplos</label>
            <textarea
              {...register('languageDevelopment.narrativeDevelopment.observationsAndExamples')}
              rows={2}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
