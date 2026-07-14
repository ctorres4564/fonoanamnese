import { useFormContext } from 'react-hook-form';
import type { PregnancyHistory } from '../../types/anamnesis';

export function PregnancyHistorySection() {
  const { register, watch, formState: { errors } } = useFormContext<{ pregnancy: PregnancyHistory }>();
  
  const pregnancyComplications = watch('pregnancy.pregnancyComplications');
  const infections = watch('pregnancy.infections');
  const medications = watch('pregnancy.medications');
  const otherSubstances = watch('pregnancy.otherSubstances');
  const hospitalizations = watch('pregnancy.hospitalizations');
  const alteredExams = watch('pregnancy.alteredExams');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">1. Gestação</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gestação Planejada</label>
          <select {...register('pregnancy.plannedPregnancy')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Idade Materna na Gestação</label>
          <input type="number" {...register('pregnancy.maternalAge', { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.pregnancy?.maternalAge && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.maternalAge.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Acompanhamento Pré-natal</label>
          <select {...register('pregnancy.prenatalCare')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número aprox. de consultas pré-natais</label>
          <input type="number" {...register('pregnancy.prenatalConsultations', { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.pregnancy?.prenatalConsultations && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.prenatalConsultations.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Intercorrências Gestacionais</label>
          <select {...register('pregnancy.pregnancyComplications')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {pregnancyComplications === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descreva as intercorrências *</label>
            <input type="text" {...register('pregnancy.pregnancyComplicationsDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.pregnancy?.pregnancyComplicationsDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.pregnancyComplicationsDescription.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Infecções durante a gestação</label>
          <select {...register('pregnancy.infections')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {infections === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descreva as infecções *</label>
            <input type="text" {...register('pregnancy.infectionsDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.pregnancy?.infectionsDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.infectionsDescription.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hipertensão</label>
          <select {...register('pregnancy.hypertension')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Diabetes Gestacional</label>
          <select {...register('pregnancy.gestationalDiabetes')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sangramentos</label>
          <select {...register('pregnancy.bleeding')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Uso de medicamentos</label>
          <select {...register('pregnancy.medications')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {medications === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descreva os medicamentos *</label>
            <input type="text" {...register('pregnancy.medicationsDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.pregnancy?.medicationsDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.medicationsDescription.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Exposição a Álcool</label>
          <select {...register('pregnancy.alcoholExposure')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Exposição a Tabaco</label>
          <select {...register('pregnancy.tobaccoExposure')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Outras substâncias</label>
          <select {...register('pregnancy.otherSubstances')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>
      
      {otherSubstances === 'sim' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Descreva as substâncias *</label>
          <input type="text" {...register('pregnancy.otherSubstancesDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.pregnancy?.otherSubstancesDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.otherSubstancesDescription.message}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Internações durante a gestação</label>
          <select {...register('pregnancy.hospitalizations')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {hospitalizations === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descreva o motivo/período *</label>
            <input type="text" {...register('pregnancy.hospitalizationsDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.pregnancy?.hospitalizationsDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.hospitalizationsDescription.message}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sofrimento fetal relatado</label>
          <select {...register('pregnancy.fetalDistress')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Exames alterados</label>
          <select {...register('pregnancy.alteredExams')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>
      
      {alteredExams === 'sim' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Descreva os exames alterados *</label>
          <input type="text" {...register('pregnancy.alteredExamsDescription')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.pregnancy?.alteredExamsDescription && <p className="mt-1 text-sm text-red-600">{errors.pregnancy.alteredExamsDescription.message}</p>}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações adicionais (Gestação)</label>
        <textarea {...register('pregnancy.additionalObservations')} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
      </div>
    </div>
  );
}
