import { useFormContext } from 'react-hook-form';
import type { MotorDevelopmentSection } from '../..';

export function PhysiotherapyHistoryFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ motorDevelopment: MotorDevelopmentSection }>();
  
  const hadPhysiotherapy = watch('motorDevelopment.physiotherapy.hadPhysiotherapy');
  const currentPhysiotherapy = watch('motorDevelopment.physiotherapy.currentPhysiotherapy');

  const showDetails = hadPhysiotherapy === 'sim' || currentPhysiotherapy === 'sim';

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
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">6. Histórico Terapêutico</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Acompanhamento fisioterapêutico anterior</label>
          <select 
            {...register('motorDevelopment.physiotherapy.hadPhysiotherapy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Acompanhamento fisioterapêutico atual</label>
          <select 
            {...register('motorDevelopment.physiotherapy.currentPhysiotherapy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Motivo do acompanhamento *</label>
            <input 
              type="text" 
              {...register('motorDevelopment.physiotherapy.reason')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {getError('motorDevelopment.physiotherapy.reason') && (
              <p className="mt-1 text-sm text-red-600">{getError('motorDevelopment.physiotherapy.reason') as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Período aproximado *</label>
            <input 
              type="text" 
              {...register('motorDevelopment.physiotherapy.period')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: De Janeiro de 2023 a Dezembro de 2023"
            />
            {getError('motorDevelopment.physiotherapy.period') && (
              <p className="mt-1 text-sm text-red-600">{getError('motorDevelopment.physiotherapy.period') as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Resultado ou evolução relatada</label>
            <textarea 
              {...register('motorDevelopment.physiotherapy.evolution')}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
