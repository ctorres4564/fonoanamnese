import { useFormContext } from 'react-hook-form'
import type { MotorDevelopmentSection } from '../..'

interface MotorMilestoneFieldProps {
  namePath: string // e.g. "motorDevelopment.milestones.cervicalControl"
  label: string
}

export function MotorMilestoneField({ namePath, label }: MotorMilestoneFieldProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ motorDevelopment: MotorDevelopmentSection }>()

  // Extract path properly to avoid typings error or just use simple watch if we know it works.
  const status = watch(`${namePath}.status` as any)

  const getError = (fieldName: string) => {
    const keys = fieldName.split('.')
    let current: any = errors
    for (const key of keys) {
      if (!current || !current[key]) return undefined
      current = current[key]
    }
    return current?.message
  }

  const statusError = getError(`${namePath}.status`)
  const ageError = getError(`${namePath}.acquisitionAgeMonths`)

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h4 className="font-medium text-gray-800 w-full md:w-1/3">{label}</h4>

        <div className="w-full md:w-2/3">
          <label className="sr-only">Status</label>
          <select
            {...register(`${namePath}.status` as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="adquirido">Adquirido</option>
            <option value="não adquirido">Não adquirido</option>
            <option value="em aquisição">Em aquisição</option>
            <option value="não informado">Não informado</option>
            <option value="não se aplica">Não se aplica</option>
          </select>
          {statusError && <p className="mt-1 text-sm text-red-600">{statusError as string}</p>}
        </div>
      </div>

      {status === 'adquirido' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700">Idade em meses</label>
            <input
              type="number"
              {...register(`${namePath}.acquisitionAgeMonths` as any, { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: 6"
            />
            {ageError && <p className="mt-1 text-sm text-red-600">{ageError as string}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idade aproximada (descrição)
            </label>
            <input
              type="text"
              {...register(`${namePath}.acquisitionAgeDescription` as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Por volta de 1 ano e meio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modo de aquisição</label>
            <select
              {...register(`${namePath}.acquisitionMode` as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="espontânea">Espontânea</option>
              <option value="com estímulo">Com estímulo</option>
              <option value="após intervenção">Após intervenção</option>
              <option value="não informado">Não informado</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Observações</label>
            <input
              type="text"
              {...register(`${namePath}.observations` as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}
