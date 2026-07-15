import { useFormContext } from 'react-hook-form'
import type { SpeechFamilyHistory } from '../types'

export function SpeechFamilyHistoryFields() {
  const { register, watch } = useFormContext<{ familyHistory: SpeechFamilyHistory }>()

  const notInformed = watch('familyHistory.notInformed')

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="familyHistory.notInformed"
          {...register('familyHistory.notInformed')}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="familyHistory.notInformed" className="text-sm font-medium text-gray-700">
          NÃ£o hÃ¡ histÃ³rico familiar / FamÃ­lia nÃ£o soube informar
        </label>
      </div>

      {!notInformed && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DescriÃ§Ã£o detalhada
            </label>
            <textarea
              {...register('familyHistory.description')}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}
