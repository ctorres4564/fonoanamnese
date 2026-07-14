import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { chiefComplaintSchema } from '../..';
import type { ChiefComplaint } from '../..';

interface ChiefComplaintSectionProps {
  initialData?: Partial<ChiefComplaint>;
  onChange: (data: Partial<ChiefComplaint>, isValid: boolean) => void;
}

export function ChiefComplaintSection({ initialData, onChange }: ChiefComplaintSectionProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    getValues
  } = useForm<ChiefComplaint>({
    resolver: zodResolver(chiefComplaintSchema),
    defaultValues: initialData || {},
    mode: 'onChange'
  });

  const onsetMode = watch('onsetMode');
  const functionalImpacts = watch('functionalImpacts') || [];
  const referralSource = watch('referralSource');

  useEffect(() => {
    const subscription = watch(() => {
      onChange(getValues(), isValid);
    });
    onChange(getValues(), isValid);
    return () => subscription.unsubscribe();
  }, [watch, onChange, getValues, isValid]);

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Queixa Principal</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Queixa principal nas palavras do responsável *</label>
        <textarea
          {...register('complaint')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Descreva exatamente como a família relatou o problema..."
        ></textarea>
        {errors.complaint && <p className="mt-1 text-sm text-red-600">{errors.complaint.message}</p>}
        <p className="mt-1 text-xs text-gray-500">Atenção: A queixa principal deve ser o relato fiel da percepção do responsável, sem jargões técnicos sempre que possível.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quem percebeu a dificuldade?</label>
          <input
            type="text"
            {...register('whoNoticed')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: A mãe, a professora, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Idade aproximada em que foi percebida</label>
          <input
            type="number"
            step="0.1"
            {...register('approximateAgeNoticed', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Idade em anos/meses"
          />
          {errors.approximateAgeNoticed && <p className="mt-1 text-sm text-red-600">{errors.approximateAgeNoticed.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="onsetMode" className="block text-sm font-medium text-gray-700">Forma de início</label>
          <select
            id="onsetMode"
            {...register('onsetMode')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="súbito">Súbito</option>
            <option value="gradual">Gradual</option>
            <option value="presente desde o início do desenvolvimento">Presente desde o início do desenvolvimento</option>
            <option value="não informado">Não informado</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duração da dificuldade</label>
          <input
            type="text"
            {...register('duration')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Há 6 meses, desde os 2 anos..."
          />
        </div>
      </div>

      {onsetMode === 'outro' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Descreva a forma de início *</label>
          <input
            type="text"
            {...register('onsetModeDescription')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.onsetModeDescription && <p className="mt-1 text-sm text-red-600">{errors.onsetModeDescription.message}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Evolução</label>
          <select
            {...register('evolution')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="melhorando">Melhorando</option>
            <option value="estável">Estável</option>
            <option value="piorando">Piorando</option>
            <option value="oscilante">Oscilante</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Origem do encaminhamento</label>
          <select
            {...register('referralSource')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="família">Família</option>
            <option value="escola">Escola</option>
            <option value="pediatria">Pediatria</option>
            <option value="neurologia">Neurologia</option>
            <option value="otorrinolaringologia">Otorrinolaringologia</option>
            <option value="psicologia">Psicologia</option>
            <option value="terapia ocupacional">Terapia Ocupacional</option>
            <option value="outro fonoaudiólogo">Outro fonoaudiólogo</option>
            <option value="outro profissional">Outro profissional</option>
            <option value="procura espontânea">Procura espontânea</option>
          </select>
        </div>
      </div>

      {referralSource === 'outro profissional' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome e profissão do encaminhador</label>
          <input
            type="text"
            {...register('referralProfessionalName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Ex: Dra. Ana (Odontopediatra)"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Impactos funcionais percebidos</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['comunicação familiar', 'escola', 'socialização', 'alimentação', 'autonomia', 'comportamento', 'participação em atividades', 'outro'].map(impact => (
            <div key={impact} className="flex items-center">
              <input
                type="checkbox"
                id={`impact_${impact}`}
                value={impact}
                {...register('functionalImpacts')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`impact_${impact}`} className="ml-2 block text-sm text-gray-900 capitalize">
                {impact}
              </label>
            </div>
          ))}
        </div>
      </div>

      {functionalImpacts.includes('outro') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Descreva o outro impacto *</label>
          <input
            type="text"
            {...register('functionalImpactsOther')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.functionalImpactsOther && <p className="mt-1 text-sm text-red-600">{errors.functionalImpactsOther.message}</p>}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Situações em que a queixa ocorre ou se agrava</label>
        <input
          type="text"
          {...register('situationsOccur')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ex: Apenas na escola, ao comer alimentos sólidos..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expectativa da família em relação à avaliação/terapia</label>
        <textarea
          {...register('familyExpectation')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações Adicionais (Queixa)</label>
        <textarea
          {...register('additionalObservations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

    </div>
  );
}
