import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PreLinguisticCommunicationFields } from './PreLinguisticCommunicationFields'
import { VocalizationHistoryFields } from './VocalizationHistoryFields'
import { CommunicationModesFields } from './CommunicationModesFields'
import type { CommunicationDevelopmentSection as CommunicationSectionType } from '../types'
import { communicationDevelopmentSchema } from '../schema'

interface CommunicationDevelopmentSectionProps {
  initialData?: CommunicationSectionType
  onChange: (data: CommunicationSectionType, isValid: boolean) => void
}

export function CommunicationDevelopmentSection({
  initialData,
  onChange,
}: CommunicationDevelopmentSectionProps) {
  const methods = useForm<{ communicationDevelopment: CommunicationSectionType }>({
    resolver: zodResolver(z.object({ communicationDevelopment: communicationDevelopmentSchema })),
    defaultValues: {
      communicationDevelopment: initialData || {},
    },
    mode: 'onChange',
  })

  const { watch } = methods

  useEffect(() => {
    const subscription = watch((value) => {
      const parsed = communicationDevelopmentSchema.safeParse(value.communicationDevelopment)
      onChange(value.communicationDevelopment as CommunicationSectionType, parsed.success)
    })
    return () => subscription.unsubscribe()
  }, [watch, onChange])

  useEffect(() => {
    // Initial validation check
    const parsed = communicationDevelopmentSchema.safeParse(initialData || {})
    onChange(initialData || {}, parsed.success)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <PreLinguisticCommunicationFields />
        <VocalizationHistoryFields />
        <CommunicationModesFields />
      </div>
    </FormProvider>
  )
}
