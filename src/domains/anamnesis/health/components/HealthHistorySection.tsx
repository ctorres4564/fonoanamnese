import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { HealthHistory } from '../types'
import { healthHistorySchema } from '../schema'

export function HealthHistorySection({
  initialData,
  onChange,
}: {
  initialData?: HealthHistory
  onChange: (data: HealthHistory, valid: boolean) => void
}) {
  const {
    register,
    watch,
    getValues,
    formState: { isValid },
  } = useForm<HealthHistory>({
    resolver: zodResolver(healthHistorySchema),
    defaultValues: initialData || {},
    mode: 'onChange',
  })
  useEffect(() => {
    const sub = watch(() => onChange(getValues(), isValid))
    onChange(getValues(), isValid)
    return () => sub.unsubscribe()
  }, [watch, getValues, isValid, onChange])
  return (
    <div className="space-y-5 max-w-4xl">
      <h2 className="text-xl font-semibold border-b pb-2">Histórico de Saúde</h2>
      <label className="block text-sm font-medium">
        Doenças prévias, internações e uso anterior de medicações
        <textarea
          {...register('previousDiseasesHospitalizationsMedications')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Histórico de cirurgias, traumas ou acidentes
        <textarea
          {...register('surgeriesTraumasAccidents')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Uso de medicações atuais
        <textarea
          {...register('currentMedications')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
    </div>
  )
}
