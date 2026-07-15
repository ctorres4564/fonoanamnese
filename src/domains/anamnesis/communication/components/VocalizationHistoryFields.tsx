import { useFormContext } from 'react-hook-form';
import type { CommunicationDevelopmentSection } from '../types';
import { YES_NO_OPTIONS } from '../constants';

export function VocalizationHistoryFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ communicationDevelopment: CommunicationDevelopmentSection }>();

  const vocalizationRegression = watch('communicationDevelopment.vocalizationHistory.vocalizationRegression');

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
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">2. Vocalizações e Balbucio</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vocalizações iniciais</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.earlyVocalizations')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Idade aproximada (meses)</label>
          <input
            type="number"
            min="0"
            {...register('communicationDevelopment.vocalizationHistory.earlyVocalizationsAge', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Balbucio</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.babbling')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Atenção: Ausência de balbucio não constitui diagnóstico isolado.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Idade aproximada de início (meses)</label>
          <input
            type="number"
            min="0"
            {...register('communicationDevelopment.vocalizationHistory.babblingAge', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Balbucio canônico</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.canonicalBabbling')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Variedade de sons</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.soundVariety')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diferentes entonações</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.differentIntonations')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Imitação vocal</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.vocalImitation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Regressão ou perda de vocalizações</label>
          <select
            {...register('communicationDevelopment.vocalizationHistory.vocalizationRegression')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {vocalizationRegression === 'sim' && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Idade aproximada da perda (meses) *</label>
              <input
                type="number"
                min="0"
                {...register('communicationDevelopment.vocalizationHistory.regressionAge', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.vocalizationHistory.regressionAge') && (
                <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.vocalizationHistory.regressionAge') as string}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição da perda *</label>
              <textarea
                {...register('communicationDevelopment.vocalizationHistory.regressionDescription')}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.vocalizationHistory.regressionDescription') && (
                <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.vocalizationHistory.regressionDescription') as string}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações gerais sobre vocalizações</label>
        <textarea
          {...register('communicationDevelopment.vocalizationHistory.observations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
