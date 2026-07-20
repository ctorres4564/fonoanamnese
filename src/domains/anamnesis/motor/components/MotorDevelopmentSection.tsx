import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { MotorMilestonesGroup } from './MotorMilestonesGroup'
import type { MotorDevelopmentSection as MotorSectionType } from '../..'
import { motorDevelopmentSchema } from '../..'

interface MotorDevelopmentSectionProps {
  initialData?: Partial<MotorSectionType>
  onChange: (data: Partial<MotorSectionType>, isValid: boolean) => void
}

export function MotorDevelopmentSection({ initialData, onChange }: MotorDevelopmentSectionProps) {
  const methods = useForm<{ motorDevelopment: MotorSectionType }>({
    resolver: zodResolver(z.object({ motorDevelopment: motorDevelopmentSchema })),
    defaultValues: { motorDevelopment: initialData || ({} as MotorSectionType) },
    mode: 'onChange',
  })
  const { watch, getValues, formState: { isValid } } = methods

  useEffect(() => {
    const subscription = watch(() => onChange(getValues().motorDevelopment, isValid))
    onChange(getValues().motorDevelopment, isValid)
    return () => subscription.unsubscribe()
  }, [watch, onChange, getValues, isValid])

  return (
    <div className="space-y-8 max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Desenvolvimento Motor</h2>
      <FormProvider {...methods}>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Marcos Motores</h3>
          <MotorMilestonesGroup />
        </div>
      </FormProvider>
    </div>
  )
}
