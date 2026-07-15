import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { pregnancyBirthNeonatalSchema } from '../..'
import type { PregnancyBirthNeonatalSection as PregnancyBirthNeonatalSectionType } from '../..'
import { PregnancyHistorySection } from './PregnancyHistorySection'
import { BirthHistorySection } from './BirthHistorySection'
import { NeonatalHistorySection } from './NeonatalHistorySection'

interface PregnancyBirthNeonatalSectionProps {
  initialData?: Partial<PregnancyBirthNeonatalSectionType>
  onChange: (data: Partial<PregnancyBirthNeonatalSectionType>, isValid: boolean) => void
}

export function PregnancyBirthNeonatalSection({
  initialData,
  onChange,
}: PregnancyBirthNeonatalSectionProps) {
  const methods = useForm<PregnancyBirthNeonatalSectionType>({
    resolver: zodResolver(pregnancyBirthNeonatalSchema),
    defaultValues: initialData || {
      pregnancy: {},
      birth: {},
      neonatal: {},
    },
    mode: 'onChange',
  })

  const {
    watch,
    getValues,
    formState: { isValid },
  } = methods

  useEffect(() => {
    const subscription = watch(() => {
      onChange(getValues(), isValid)
    })
    // Trigger on mount for initial validation state
    onChange(getValues(), isValid)
    return () => subscription.unsubscribe()
  }, [watch, onChange, getValues, isValid])

  return (
    <div className="space-y-12 max-w-5xl">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Gestação, Parto e Período Neonatal
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Preencha os dados relacionados ao histórico gestacional, momento do parto e período após o
        nascimento.
      </p>

      <FormProvider {...methods}>
        <form className="space-y-12">
          <PregnancyHistorySection />
          <BirthHistorySection />
          <NeonatalHistorySection />
        </form>
      </FormProvider>
    </div>
  )
}
