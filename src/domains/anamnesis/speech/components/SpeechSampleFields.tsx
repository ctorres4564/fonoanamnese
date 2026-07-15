import { useFormContext } from 'react-hook-form'
import { YES_NO_INFORMED_OPTIONS, SPEECH_SAMPLE_TYPE_OPTIONS } from '../constants'
import type { SpeechSampleObservation } from '../types'

export function SpeechSampleFields() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ sample: SpeechSampleObservation }>()

  const sampleTaken = watch('sample.sampleTaken')
  const sampleType = watch('sample.sampleType')

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foi possÃ­vel colher amostra de fala durante a anamnese?
        </label>
        <select
          {...register('sample.sampleTaken')}
          className="w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione...</option>
          {YES_NO_INFORMED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.sample?.sampleTaken && (
          <p className="mt-1 text-sm text-red-600">{errors.sample.sampleTaken.message}</p>
        )}
      </div>

      {sampleTaken === 'sim' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de amostra principal
              </label>
              <select
                {...register('sample.sampleType')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {SPEECH_SAMPLE_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {sampleType === 'outra' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qual outro tipo? (obrigatÃ³rio)
                </label>
                <input
                  type="text"
                  {...register('sample.otherSampleTypeDescription')}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.sample?.otherSampleTypeDescription && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sample.otherSampleTypeDescription.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contexto da amostra
              </label>
              <input
                type="text"
                {...register('sample.context')}
                placeholder="Ex: brincando com os pais"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DuraÃ§Ã£o aproximada
              </label>
              <input
                type="text"
                {...register('sample.approximateDuration')}
                placeholder="Ex: 5 minutos, poucas palavras"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inteligibilidade percebida pelo avaliador
            </label>
            <textarea
              {...register('sample.perceivedIntelligibility')}
              rows={2}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principais ocorrÃªncias notadas (trocas, omissÃµes, esforÃ§o, etc)
            </label>
            <textarea
              {...register('sample.mainOccurrences')}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Houve limitaÃ§Ãµes na amostra?
            </label>
            <textarea
              {...register('sample.sampleLimitations')}
              rows={2}
              placeholder="Ex: CrianÃ§a tÃ­mida, chorou, amostra pequena"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-3 bg-muted/20 p-4 rounded-md border">
            <input
              type="checkbox"
              id="sampleNeedsSpecificEvaluation"
              {...register('sample.needsSpecificEvaluation')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="sampleNeedsSpecificEvaluation"
              className="text-sm font-medium text-gray-700"
            >
              A amostra indica necessidade de avaliaÃ§Ã£o formal aprofundada
            </label>
          </div>
        </div>
      )}

      {sampleTaken === 'nao' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Por que nÃ£o foi possÃ­vel colher a amostra?
          </label>
          <textarea
            {...register('sample.sampleLimitations')}
            rows={2}
            placeholder="Ex: CrianÃ§a nÃ£o compareceu, nÃ£o quis falar"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      )}
    </div>
  )
}
