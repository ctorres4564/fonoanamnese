import { useFormContext } from 'react-hook-form';
import type { CommunicationDevelopmentSection } from '../types';
import { YES_NO_OPTIONS } from '../constants';

export function AlternativeCommunicationFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ communicationDevelopment: CommunicationDevelopmentSection }>();

  const usesResource = watch('communicationDevelopment.alternativeCommunication.usesResource');

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
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">5. Comunicação Suplementar ou Alternativa (CSA)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Utiliza algum recurso de comunicação alternativa?</label>
          <select
            {...register('communicationDevelopment.alternativeCommunication.usesResource')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {usesResource === 'sim' && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de recurso *</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.resourceType')}
                placeholder="Ex: Pranchas, tablet, PECS"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.alternativeCommunication.resourceType') && (
                <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.alternativeCommunication.resourceType') as string}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sistema ou aplicativo (se houver)</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.systemOrApp')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequência de uso</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.usageFrequency')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ambientes de uso</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.usageEnvironments')}
                placeholder="Ex: Casa, escola, terapias"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quem introduziu o recurso?</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.introducedBy')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Houve orientação profissional?</label>
              <select
                {...register('communicationDevelopment.alternativeCommunication.professionalGuidance')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pessoas que utilizam o recurso com a criança</label>
              <input
                type="text"
                {...register('communicationDevelopment.alternativeCommunication.peopleWhoUseWithChild')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dificuldades de uso relatadas</label>
              <textarea
                {...register('communicationDevelopment.alternativeCommunication.usageDifficulties')}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Eficácia percebida pela família</label>
              <textarea
                {...register('communicationDevelopment.alternativeCommunication.perceivedEfficacy')}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {usesResource === 'não' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sente necessidade de avaliação para comunicação alternativa?</label>
            <select
              {...register('communicationDevelopment.alternativeCommunication.needsSpecificEvaluation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione...</option>
              {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <p className="text-xs text-gray-500 mt-1">Atenção: A indicação de adequação de recurso requer avaliação profissional específica.</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações gerais sobre CSA</label>
        <textarea
          {...register('communicationDevelopment.alternativeCommunication.observations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
