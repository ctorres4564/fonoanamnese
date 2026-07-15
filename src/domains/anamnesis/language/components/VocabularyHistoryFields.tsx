import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LANGUAGE_SKILL_STATUS, YES_NO_OPTIONS } from '../constants';

export function VocabularyHistoryFields() {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">4. Vocabulário</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-4">
            Estimativas familiares de vocabulário são dados de anamnese e não substituem avaliação formal.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vocabulário Compreendido Estimado</label>
              <input
                type="number"
                min="0"
                {...register('languageDevelopment.vocabularyHistory.estimatedComprehendedVocabulary', { valueAsNumber: true })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vocabulário Produzido Estimado</label>
              <input
                type="number"
                min="0"
                {...register('languageDevelopment.vocabularyHistory.estimatedProducedVocabulary', { valueAsNumber: true })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Variedade de Classes de Palavras</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'nounVariety', label: 'Variedade de Substantivos' },
                { key: 'verbVariety', label: 'Variedade de Verbos' },
                { key: 'adjectiveVariety', label: 'Variedade de Adjetivos' },
                { key: 'functionalWordVariety', label: 'Variedade de Palavras Funcionais' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <select
                    {...register(`languageDevelopment.vocabularyHistory.${item.key}`)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {LANGUAGE_SKILL_STATUS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700">Características</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'learnsNewWordsEasily', label: 'Aprende palavras novas com facilidade?' },
                { key: 'needsFrequentRepetition', label: 'Necessita de repetição frequente?' },
                { key: 'forgetsLearnedWords', label: 'Esquece palavras aprendidas?' },
                { key: 'usesWordsOutOfContext', label: 'Utiliza palavras fora de contexto?' },
                { key: 'usesGenericWords', label: 'Utiliza palavras genéricas?' },
                { key: 'difficultyAccessingNames', label: 'Dificuldade para acessar nomes?' },
                { key: 'restrictedToSpecificInterests', label: 'Vocabulário restrito a interesses específicos?' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <select
                    {...register(`languageDevelopment.vocabularyHistory.${item.key}`)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos Relatados</label>
            <textarea
              {...register('languageDevelopment.vocabularyHistory.examples')}
              rows={2}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
