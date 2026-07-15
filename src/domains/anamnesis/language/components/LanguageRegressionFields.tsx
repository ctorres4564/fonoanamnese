import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { REGRESSION_ONSET_MODES, YES_NO_OPTIONS } from '../constants';

export function LanguageRegressionFields() {
  const { register, watch } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const hasRegression = watch('languageDevelopment.languageRegression.hasRegression');
  const onsetMode = watch('languageDevelopment.languageRegression.onsetMode');
  const showRegressionFields = hasRegression === 'sim';
  const showOtherOnsetMode = onsetMode === 'outro';

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">8. Regressão de Linguagem</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Houve perda de habilidade linguística já adquirida?</label>
            <select
              {...register('languageDevelopment.languageRegression.hasRegression')}
              className="w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione...</option>
              {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          {showRegressionFields && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-md space-y-6">
              <div className="text-orange-800 text-sm font-medium mb-2">
                Foi relatada perda de habilidade linguística previamente adquirida. Essa informação requer investigação profissional e não constitui diagnóstico.
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qual(is) habilidade(s) foi(ram) perdida(s)?</label>
                <input
                  type="text"
                  {...register('languageDevelopment.languageRegression.lostSkills')}
                  placeholder="Descreva as habilidades"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-orange-200 pt-4">
                {[
                  { key: 'wordLoss', label: 'Perda de palavras' },
                  { key: 'phraseLoss', label: 'Perda de frases' },
                  { key: 'vocabularyReduction', label: 'Redução do vocabulário' },
                  { key: 'comprehensionLoss', label: 'Perda de compreensão' },
                  { key: 'responseCapacityLoss', label: 'Perda da capacidade de responder' },
                  { key: 'narrativeCapacityLoss', label: 'Perda da capacidade de narrar' },
                ].map(item => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                    <select
                      {...register(`languageDevelopment.languageRegression.${item.key}`)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Selecione...</option>
                      {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-orange-200 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idade Aproximada da Perda</label>
                  <input
                    type="text"
                    {...register('languageDevelopment.languageRegression.approximateAge')}
                    placeholder="Ex: 2 anos, ou 'não informado'"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modo de Início</label>
                  <select
                    {...register('languageDevelopment.languageRegression.onsetMode')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {REGRESSION_ONSET_MODES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {showOtherOnsetMode && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qual outro modo?</label>
                    <input
                      type="text"
                      {...register('languageDevelopment.languageRegression.otherOnsetModeDescription')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 border-t border-orange-200 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contexto Associado</label>
                  <textarea
                    {...register('languageDevelopment.languageRegression.associatedContext')}
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Eventos, doenças, mudanças ambientais..."
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: 'partialRecovery', label: 'Recuperação Parcial' },
                    { key: 'totalRecovery', label: 'Recuperação Total' },
                    { key: 'professionalEvaluationPerformed', label: 'Avaliação Profissional Realizada' }
                  ].map(item => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                      <select
                        {...register(`languageDevelopment.languageRegression.${item.key}`)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="">Selecione...</option>
                        {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações Adicionais</label>
                  <textarea
                    {...register('languageDevelopment.languageRegression.observations')}
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
