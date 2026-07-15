import { useFormContext } from 'react-hook-form';
import type { CommunicationDevelopmentSection } from '../types';
import { COMMUNICATION_MODES } from '../constants';

export function CommunicationModesFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ communicationDevelopment: CommunicationDevelopmentSection }>();

  const selectedModes = watch('communicationDevelopment.communicationModes') || [];
  const hasOther = selectedModes.includes('outro');

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
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">4. Modos de Comunicação Utilizados</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Como a criança se comunica principalmente? (Selecione todos que se aplicam)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {COMMUNICATION_MODES.map(mode => (
            <div key={mode} className="flex items-center">
              <input
                type="checkbox"
                value={mode}
                {...register('communicationDevelopment.communicationModes')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700 capitalize">{mode}</label>
            </div>
          ))}
        </div>
      </div>

      {hasOther && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Descrição para outro modo de comunicação *</label>
          <input
            type="text"
            {...register('communicationDevelopment.communicationModeOtherDescription')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {getError('communicationDevelopment.communicationModeOtherDescription') && (
            <p className="mt-1 text-sm text-red-600">{getError('communicationDevelopment.communicationModeOtherDescription') as string}</p>
          )}
        </div>
      )}
    </div>
  );
}
