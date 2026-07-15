import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LANGUAGE_DIFFICULTIES_OPTIONS } from '../constants';

export function LanguageDifficultiesFields() {
  const { register, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const reportedDifficulties = watch('languageDevelopment.languageDifficulties.reportedDifficulties') || [];
  const showOtherDifficulty = Array.isArray(reportedDifficulties) && reportedDifficulties.includes('outra');

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">7. Dificuldades Relatadas</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quais dificuldades foram relatadas?</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {LANGUAGE_DIFFICULTIES_OPTIONS.map(opt => (
                <label key={opt} className="flex items-center">
                  <input
                    type="checkbox"
                    value={opt}
                    {...register('languageDevelopment.languageDifficulties.reportedDifficulties')}
                    className="mr-2 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>
          
          {showOtherDifficulty && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qual outra dificuldade?</label>
              <input
                type="text"
                {...register('languageDevelopment.languageDifficulties.otherDifficultyDescription')}
                placeholder="Descreva a outra dificuldade"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Idade em que a dificuldade foi percebida</label>
              <input
                type="text"
                {...register('languageDevelopment.languageDifficulties.agePerceived')}
                placeholder="Ex: 2 anos e meio"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evolução da Dificuldade</label>
              <input
                type="text"
                {...register('languageDevelopment.languageDifficulties.evolution')}
                placeholder="Ex: Estável, Piorou, Melhorou com o tempo"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Situações de Maior Dificuldade</label>
              <textarea
                {...register('languageDevelopment.languageDifficulties.hardestSituations')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estratégias que Ajudam</label>
              <textarea
                {...register('languageDevelopment.languageDifficulties.helpfulStrategies')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impacto Funcional</label>
              <textarea
                {...register('languageDevelopment.languageDifficulties.functionalImpact')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações Adicionais</label>
              <textarea
                {...register('languageDevelopment.languageDifficulties.observations')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
