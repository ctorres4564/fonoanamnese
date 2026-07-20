import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FamilyHistory } from '../types'
import { familyHistorySchema } from '../schema'

export function FamilyHistorySection({
  initialData,
  onChange,
}: {
  initialData?: FamilyHistory
  onChange: (data: FamilyHistory, valid: boolean) => void
}) {
  const {
    register,
    watch,
    getValues,
    formState: { isValid },
  } = useForm<FamilyHistory>({
    resolver: zodResolver(familyHistorySchema),
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
      <h2 className="text-xl font-semibold border-b pb-2">Histórico Familiar</h2>
      <label className="block text-sm font-medium">
        Relato de dificuldades de fala, audição ou aprendizagem na família
        <textarea
          {...register('speechHearingLearningDifficulties')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Casos de doenças neurológicas ou psiquiátricas na família
        <textarea
          {...register('neurologicalPsychiatricConditions')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
    </div>
  )
}
