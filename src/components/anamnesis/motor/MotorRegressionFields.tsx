import { useFormContext } from 'react-hook-form';
import type { MotorDevelopmentSection } from '../../../types/anamnesis';

export function MotorRegressionFields() {
  const { register, watch, formState: { errors } } = useFormContext<{ motorDevelopment: MotorDevelopmentSection }>();
  
  const hasRegression = watch('motorDevelopment.regression.hasRegression');
  const onsetMode = watch('motorDevelopment.regression.onsetMode');

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
      <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">5. Regressão</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Houve regressão motora?</label>
        <select 
          {...register('motorDevelopment.regression.hasRegression')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:w-1/3"
        >
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="não informado">Não informado</option>
        </select>
      </div>

      {hasRegression === 'sim' && (
        <>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-yellow-700">
              <strong>Aviso:</strong> Foi relatada perda de habilidade motora previamente adquirida. Essa informação requer investigação profissional e não constitui diagnóstico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Habilidade perdida *</label>
              <input 
                type="text" 
                {...register('motorDevelopment.regression.lostSkill')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {getError('motorDevelopment.regression.lostSkill') && (
                <p className="mt-1 text-sm text-red-600">{getError('motorDevelopment.regression.lostSkill') as string}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Idade aproximada da regressão (meses) *</label>
              <input 
                type="number" 
                {...register('motorDevelopment.regression.regressionAge', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {getError('motorDevelopment.regression.regressionAge') && (
                <p className="mt-1 text-sm text-red-600">{getError('motorDevelopment.regression.regressionAge') as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Forma de início</label>
              <select 
                {...register('motorDevelopment.regression.onsetMode')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Selecione...</option>
                <option value="súbita">Súbita</option>
                <option value="gradual">Gradual</option>
                <option value="não informado">Não informado</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            {onsetMode === 'outro' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Descreva a forma de início *</label>
                <input 
                  type="text" 
                  {...register('motorDevelopment.regression.onsetModeOther')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {getError('motorDevelopment.regression.onsetModeOther') && (
                  <p className="mt-1 text-sm text-red-600">{getError('motorDevelopment.regression.onsetModeOther') as string}</p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
