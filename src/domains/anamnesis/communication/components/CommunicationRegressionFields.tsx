import { useFormContext } from 'react-hook-form';
import type { CommunicationDevelopmentSection } from '../types';
import { YES_NO_OPTIONS, REGRESSION_ONSET_MODES } from '../constants';

export function CommunicationRegressionFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ communicationDevelopment: CommunicationDevelopmentSection }>();

  const hadLoss = watch('communicationDevelopment.communicationRegression.hadLoss');
  const onsetMode = watch('communicationDevelopment.communicationRegression.onsetMode');

  const getError = (fieldName: string) => {
    const keys = fieldName.split('.');
    let current: any = errors;
    for (const key of keys) {
      if (!current || !current[key]) return undefined;
      current = current[key];
    }
    return current?.message;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">6. Regressão Comunicativa Geral</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Houve perda de habilidades comunicativas?</label>
          <select
            {...register('communicationDevelopment.communicationRegression.hadLoss')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {hadLoss === 'sim' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Atenção Clínica</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Foi relatada perda de habilidade comunicativa previamente adquirida. Essa informação requer investigação profissional e não constitui diagnóstico.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Habilidade perdida *</label>
              <input
                type="text"
                {...register('communicationDevelopment.communicationRegression.lostSkill')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.communicationRegression.lostSkill') && (
                <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.communicationRegression.lostSkill') as string}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Idade aproximada (meses) *</label>
              <input
                type="number"
                min="0"
                {...register('communicationDevelopment.communicationRegression.regressionAge', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.communicationRegression.regressionAge') && (
                <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.communicationRegression.regressionAge') as string}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Início súbito ou gradual?</label>
              <select
                {...register('communicationDevelopment.communicationRegression.onsetMode')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {REGRESSION_ONSET_MODES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            {onsetMode === 'outro' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição do início *</label>
                <input
                  type="text"
                  {...register('communicationDevelopment.communicationRegression.onsetModeOtherDescription')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {getError('communicationDevelopment.communicationRegression.onsetModeOtherDescription') && (
                  <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.communicationRegression.onsetModeOtherDescription') as string}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recuperação</label>
              <select
                {...register('communicationDevelopment.communicationRegression.recovery')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                <option value="total">Total</option>
                <option value="parcial">Parcial</option>
                <option value="nenhuma">Nenhuma</option>
                <option value="não informado">Não informado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Foi realizada avaliação profissional?</label>
              <select
                {...register('communicationDevelopment.communicationRegression.professionalEvaluation')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contexto associado</label>
            <textarea
              {...register('communicationDevelopment.communicationRegression.associatedContext')}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações gerais sobre regressão</label>
        <textarea
          {...register('communicationDevelopment.communicationRegression.observations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
