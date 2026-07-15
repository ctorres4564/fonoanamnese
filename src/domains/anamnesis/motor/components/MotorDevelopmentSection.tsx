import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { MotorMilestonesGroup } from './MotorMilestonesGroup'
import { MotorRegressionFields } from './MotorRegressionFields'
import { PhysiotherapyHistoryFields } from './PhysiotherapyHistoryFields'
import type { MotorDevelopmentSection as MotorSectionType } from '../..'
import { motorDevelopmentSchema } from '../..'

function MotorDevelopmentFields() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ motorDevelopment: MotorSectionType }>()

  const reportedMotorDelay = watch('motorDevelopment.general.reportedMotorDelay')
  const frequentFalls = watch('motorDevelopment.general.frequentFalls')
  const usesMobilityDevice = watch('motorDevelopment.general.usesMobilityDevice')

  const getError = (fieldName: string) => {
    const keys = fieldName.split('.')
    let current: any = errors
    for (const key of keys) {
      if (!current || !current[key]) return undefined
      current = current[key]
    }
    return current?.message
  }

  return (
    <div className="space-y-6">
      {/* 1-4. Marcos Motores (Agrupados) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Marcos Motores</h2>
        <MotorMilestonesGroup />
      </div>

      {/* 5. Regressão */}
      <MotorRegressionFields />

      {/* 6. Histórico Terapêutico */}
      <PhysiotherapyHistoryFields />

      {/* 7. Observações Gerais e Dificuldades */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">
          7. Condições Gerais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Desenvolvimento percebido como compatível com a idade
            </label>
            <select
              {...register('motorDevelopment.general.ageAppropriateDevelopment')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
              <option value="não informado">Não informado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Atraso motor relatado</label>
            <select
              {...register('motorDevelopment.general.reportedMotorDelay')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
              <option value="não informado">Não informado</option>
            </select>
          </div>
        </div>

        {reportedMotorDelay === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição do atraso motor *
            </label>
            <input
              type="text"
              {...register('motorDevelopment.general.motorDelayDescription')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {getError('motorDevelopment.general.motorDelayDescription') && (
              <p className="mt-1 text-sm text-red-600">
                {getError('motorDevelopment.general.motorDelayDescription') as string}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dificuldade de equilíbrio
            </label>
            <select
              {...register('motorDevelopment.general.balanceDifficulty')}
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
              Dificuldade para correr
            </label>
            <select
              {...register('motorDevelopment.general.runningDifficulty')}
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
              Dificuldade para subir/descer escadas
            </label>
            <select
              {...register('motorDevelopment.general.stairsDifficulty')}
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
              Dificuldade com objetos pequenos
            </label>
            <select
              {...register('motorDevelopment.general.smallObjectsDifficulty')}
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
              Dificuldade com ferramentas (lápis, talheres)
            </label>
            <select
              {...register('motorDevelopment.general.toolsDifficulty')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="sim">Sim</option>
              <option value="não">Não</option>
              <option value="não informado">Não informado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quedas frequentes</label>
          <select
            {...register('motorDevelopment.general.frequentFalls')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:w-1/3"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>

        {frequentFalls === 'sim' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                <strong>Aviso:</strong> Quedas recorrentes devem ser analisadas considerando idade,
                ambiente, desenvolvimento e condições de saúde.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição (Frequência, contexto, consequências)
              </label>
              <textarea
                {...register('motorDevelopment.general.frequentFallsDescription')}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferência manual</label>
            <select
              {...register('motorDevelopment.general.manualPreference')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="direita">Direita</option>
              <option value="esquerda">Esquerda</option>
              <option value="alternada">Alternada</option>
              <option value="ainda não definida">Ainda não definida</option>
              <option value="não informado">Não informado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idade em que foi percebida
            </label>
            <input
              type="text"
              {...register('motorDevelopment.general.manualPreferenceAge')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Uso de órtese, prótese ou dispositivo de mobilidade
          </label>
          <select
            {...register('motorDevelopment.general.usesMobilityDevice')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:w-1/3"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>

        {usesMobilityDevice === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de dispositivo *</label>
            <input
              type="text"
              {...register('motorDevelopment.general.mobilityDeviceType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {getError('motorDevelopment.general.mobilityDeviceType') && (
              <p className="mt-1 text-sm text-red-600">
                {getError('motorDevelopment.general.mobilityDeviceType') as string}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Movimentos repetitivos</label>
          <select
            {...register('motorDevelopment.general.repetitiveMovements')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 md:w-1/3"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição de movimentos repetitivos
          </label>
          <input
            type="text"
            {...register('motorDevelopment.general.repetitiveMovementsDescription')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observações adicionais (Geral)
          </label>
          <textarea
            {...register('motorDevelopment.general.additionalObservations')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

interface MotorDevelopmentSectionProps {
  initialData?: Partial<MotorSectionType>
  onChange: (data: Partial<MotorSectionType>, isValid: boolean) => void
}

export function MotorDevelopmentSection({ initialData, onChange }: MotorDevelopmentSectionProps) {
  const methods = useForm<{ motorDevelopment: MotorSectionType }>({
    resolver: zodResolver(z.object({ motorDevelopment: motorDevelopmentSchema })),
    defaultValues: { motorDevelopment: initialData || ({} as any) },
    mode: 'onChange',
  })

  const {
    watch,
    getValues,
    formState: { isValid },
  } = methods

  useEffect(() => {
    const subscription = watch(() => {
      onChange(getValues().motorDevelopment, isValid)
    })
    // Trigger on mount for initial validation state
    onChange(getValues().motorDevelopment, isValid)
    return () => subscription.unsubscribe()
  }, [watch, onChange, getValues, isValid])

  return (
    <div className="space-y-12 max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Desenvolvimento Motor</h2>
      <p className="text-sm text-gray-500 mt-2">
        Preencha os dados relacionados aos marcos motores, histórico terapêutico e regressões.
      </p>

      <FormProvider {...methods}>
        <form className="space-y-12">
          <MotorDevelopmentFields />
        </form>
      </FormProvider>
    </div>
  )
}
