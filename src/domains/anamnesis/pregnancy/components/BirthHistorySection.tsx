import { useFormContext } from 'react-hook-form'
import type { BirthHistory } from '../..'

export function BirthHistorySection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ birth: BirthHistory }>()

  const deliveryType = watch('birth.deliveryType')
  const nicuAdmission = watch('birth.nicuAdmission')
  const resuscitationNeeded = watch('birth.resuscitationNeeded')
  const gestationalAgeWeeks = watch('birth.gestationalAgeWeeks')

  const showPrematurityWarning = gestationalAgeWeeks && gestationalAgeWeeks < 37
  const showNicuWarning = nicuAdmission === 'sim'

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">2. Parto</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Parto</label>
          <select
            {...register('birth.deliveryType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="vaginal">Vaginal</option>
            <option value="cesárea">Cesárea</option>
            <option value="fórceps">Fórceps</option>
            <option value="parto instrumentado">Parto instrumentado</option>
            <option value="não informado">Não informado</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        {deliveryType === 'outro' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descreva o tipo de parto *
            </label>
            <input
              type="text"
              {...register('birth.deliveryTypeOther')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.birth?.deliveryTypeOther && (
              <p className="mt-1 text-sm text-red-600">{errors.birth.deliveryTypeOther.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Idade Gestacional (semanas)
          </label>
          <input
            type="number"
            {...register('birth.gestationalAgeWeeks', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.gestationalAgeWeeks && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.gestationalAgeWeeks.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prematuridade relatada</label>
          <select
            {...register('birth.prematurity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Classificação (opcional)
          </label>
          <input
            type="text"
            {...register('birth.prematurityClassification')}
            placeholder="Ex: prematuro extremo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {showPrematurityWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Aviso:</strong> A idade gestacional indica prematuridade (menor que 37
                semanas). Informação relevante para investigação clínica e definição de conduta
                profissional. Este aviso não constitui diagnóstico automático.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Peso ao nascer (gramas)</label>
          <input
            type="number"
            {...register('birth.birthWeight', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.birthWeight && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.birthWeight.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comprimento (cm)</label>
          <input
            type="number"
            step="0.1"
            {...register('birth.birthLength', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.birthLength && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.birthLength.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Perímetro Cefálico (cm)</label>
          <input
            type="number"
            step="0.1"
            {...register('birth.headCircumference', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.headCircumference && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.headCircumference.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Apgar (1º minuto)</label>
          <input
            type="number"
            {...register('birth.apgar1', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.apgar1 && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.apgar1.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apgar (5º minuto)</label>
          <input
            type="number"
            {...register('birth.apgar5', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.birth?.apgar5 && (
            <p className="mt-1 text-sm text-red-600">{errors.birth.apgar5.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Complicações no parto</label>
          <select
            {...register('birth.birthComplications')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Necessidade de oxigênio</label>
          <select
            {...register('birth.oxygenNeeded')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Intubação</label>
          <select
            {...register('birth.intubationNeeded')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Necessidade de reanimação
          </label>
          <select
            {...register('birth.resuscitationNeeded')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {resuscitationNeeded === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição da reanimação
            </label>
            <input
              type="text"
              {...register('birth.resuscitationDescription')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Internação em UTI neonatal
          </label>
          <select
            {...register('birth.nicuAdmission')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {nicuAdmission === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Motivo e duração da UTI *
            </label>
            <input
              type="text"
              {...register('birth.nicuDurationAndReason')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.birth?.nicuDurationAndReason && (
              <p className="mt-1 text-sm text-red-600">
                {errors.birth.nicuDurationAndReason.message}
              </p>
            )}
          </div>
        )}
      </div>

      {showNicuWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Aviso:</strong> Histórico de UTI Neonatal. Informação relevante para
                investigação clínica e definição de conduta profissional.
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tempo de internação geral (mãe e bebê)
        </label>
        <input
          type="text"
          {...register('birth.hospitalizationTime')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações (Parto)</label>
        <textarea
          {...register('birth.observations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  )
}
