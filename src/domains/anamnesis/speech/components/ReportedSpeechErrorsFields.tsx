import { useFormContext } from 'react-hook-form'
import type { ReportedSpeechError } from '../types'

export function ReportedSpeechErrorsFields() {
  const { register } = useFormContext<{ reportedErrors: ReportedSpeechError }>()
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipos de alteraÃ§Ã£o relatada (mÃºltipla escolha)
        </label>
        <input
          type="text"
          {...register('reportedErrors.types')}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>{' '}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sons percebidos como difÃ­ceis (ex: R, S, L, LH)
        </label>
        <input
          type="text"
          {...register('reportedErrors.difficultSounds')}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PosiÃ§Ã£o na palavra
          </label>
          <input
            type="text"
            {...register('reportedErrors.positionInWord')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impacto (relato familiar)
          </label>
          <input
            type="text"
            {...register('reportedErrors.impact')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exemplos de palavras faladas com erro
        </label>
        <textarea
          {...register('reportedErrors.examples')}
          rows={3}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}
