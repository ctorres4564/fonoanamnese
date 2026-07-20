import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ChildRoutine } from '../types'
import { childRoutineSchema } from '../schema'

export function ChildRoutineSection({
  initialData,
  onChange,
}: {
  initialData?: ChildRoutine
  onChange: (data: ChildRoutine, valid: boolean) => void
}) {
  const {
    register,
    watch,
    getValues,
    formState: { isValid },
  } = useForm<ChildRoutine>({
    resolver: zodResolver(childRoutineSchema),
    defaultValues: initialData || {},
    mode: 'onChange',
  })
  const attendsSchool = watch('attendsSchool')
  useEffect(() => {
    const sub = watch(() => onChange(getValues(), isValid))
    onChange(getValues(), isValid)
    return () => sub.unsubscribe()
  }, [watch, getValues, isValid, onChange])
  return (
    <div className="space-y-5 max-w-4xl">
      <h2 className="text-xl font-semibold border-b pb-2">Rotina da Criança</h2>
      <label className="block text-sm font-medium">
        Frequenta escola?
        <select
          {...register('attendsSchool')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="não">Não</option>
          <option value="não informado">Não informado</option>
        </select>
      </label>
      {attendsSchool === 'sim' && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium">
            Qual escola?
            <input
              {...register('schoolName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
          <label className="block text-sm font-medium">
            Qual ano escolar?
            <input
              {...register('schoolYear')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
      )}
      <label className="block text-sm font-medium">
        Desempenho escolar
        <textarea
          {...register('schoolPerformance')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Socialização
        <textarea
          {...register('socialization')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Atividades de lazer e brincadeiras preferidas
        <textarea
          {...register('leisureAndPreferredPlay')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Há uma rotina de alimentação e sono?
        <textarea
          {...register('feedingAndSleepRoutine')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
      <label className="block text-sm font-medium">
        Observações
        <textarea
          {...register('observations')}
          rows={4}
          placeholder="O responsável quer informar algo que não foi perguntado?"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>
    </div>
  )
}
