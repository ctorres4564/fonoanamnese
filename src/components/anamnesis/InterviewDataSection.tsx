import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { interviewDataSchema } from '../../schemas/anamnesis';
import type { InterviewData } from '../../types/anamnesis';

interface InterviewDataSectionProps {
  initialData?: Partial<InterviewData>;
  onChange: (data: Partial<InterviewData>, isValid: boolean) => void;
}

export function InterviewDataSection({ initialData, onChange }: InterviewDataSectionProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    getValues
  } = useForm<InterviewData>({
    resolver: zodResolver(interviewDataSchema),
    defaultValues: initialData || {},
    mode: 'onChange'
  });

  // Watch fields for conditional logic
  const location = watch('location');
  const informationQuality = watch('informationQuality');
  const modality = watch('modality');

  // Trigger onChange when form values change
  useEffect(() => {
    const subscription = watch(() => {
      onChange(getValues(), isValid);
    });
    // Trigger once on mount to establish initial validity
    onChange(getValues(), isValid);
    return () => subscription.unsubscribe();
  }, [watch, onChange, getValues, isValid]);

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Dados da Entrevista</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data da Entrevista *</label>
          <input
            type="date"
            {...register('interviewDate')}
            max={new Date().toISOString().split('T')[0]} // bloqueia datas futuras no HTML também
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.interviewDate && <p className="mt-1 text-sm text-red-600">{errors.interviewDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horário de Início</label>
          <input
            type="time"
            {...register('startTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horário de Término</label>
          <input
            type="time"
            {...register('endTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Entrevistado *</label>
          <input
            type="text"
            {...register('interviewee')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Nome do entrevistado"
          />
          {errors.interviewee && <p className="mt-1 text-sm text-red-600">{errors.interviewee.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vínculo com a criança *</label>
          <input
            type="text"
            {...register('relationship')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Mãe, Pai, Avó"
          />
          {errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('childPresent')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Criança estava presente durante a entrevista?
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Outros participantes</label>
        <input
          type="text"
          {...register('otherParticipants')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Outras pessoas presentes (opcional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Modalidade</label>
          <select
            {...register('modality')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="presencial">Presencial</option>
            <option value="domiciliar">Domiciliar</option>
            <option value="remoto">Remoto</option>
            <option value="híbrido">Híbrido</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Local</label>
          <select
            id="location"
            {...register('location')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="consultório">Consultório</option>
            <option value="clínica">Clínica</option>
            <option value="domicílio">Domicílio</option>
            <option value="escola">Escola</option>
            <option value="hospital">Hospital</option>
            <option value="remoto">Remoto</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      {/* Condicionais Modality/Location */}
      {modality === 'domiciliar' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Endereço/Identificação do local domiciliar *</label>
          <input
            type="text"
            {...register('modalityAddress')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.modalityAddress && <p className="mt-1 text-sm text-red-600">{errors.modalityAddress.message}</p>}
        </div>
      )}

      {modality === 'remoto' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Plataforma Utilizada *</label>
          <input
            type="text"
            {...register('modalityPlatform')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Google Meet, Zoom, WhatsApp"
          />
          {errors.modalityPlatform && <p className="mt-1 text-sm text-red-600">{errors.modalityPlatform.message}</p>}
        </div>
      )}

      {location === 'outro' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição do Local *</label>
          <input
            type="text"
            {...register('locationDescription')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.locationDescription && <p className="mt-1 text-sm text-red-600">{errors.locationDescription.message}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Qualidade das informações</label>
          <select
            {...register('informationQuality')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="adequada">Adequada</option>
            <option value="parcialmente adequada">Parcialmente adequada</option>
            <option value="limitada">Limitada</option>
            <option value="não foi possível determinar">Não foi possível determinar</option>
          </select>
        </div>

        {(informationQuality === 'parcialmente adequada' || informationQuality === 'limitada') && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Justificativa da limitação *</label>
            <textarea
              {...register('informationLimitationReason')}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
            {errors.informationLimitationReason && <p className="mt-1 text-sm text-red-600">{errors.informationLimitationReason.message}</p>}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações gerais da entrevista</label>
        <textarea
          {...register('observations')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

    </div>
  );
}
