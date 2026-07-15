import { useFormContext } from 'react-hook-form'
import type { CommunicationDevelopmentSection } from '../types'
import { YES_NO_OPTIONS } from '../constants'

export function EarlyLanguageDevelopmentFields() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ communicationDevelopment: CommunicationDevelopmentSection }>()

  const wordLoss = watch('communicationDevelopment.earlyLanguageDevelopment.wordLoss')
  const estimatedProducedWords = watch(
    'communicationDevelopment.earlyLanguageDevelopment.estimatedProducedWords',
  )

  const getError = (fieldName: string) => {
    const keys = fieldName.split('.')
    let current: any = errors
    for (const key of keys) {
      if (!current || !current[key]) return undefined
      current = current[key]
    }
    return current?.message
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
        3. Primeiras Palavras e Frases
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primeiras palavras</label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.firstWords')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Idade aproximada (meses)
          </label>
          <input
            type="number"
            min="0"
            {...register('communicationDevelopment.earlyLanguageDevelopment.firstWordsAge', {
              valueAsNumber: true,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Exemplos relatados</label>
          <input
            type="text"
            {...register('communicationDevelopment.earlyLanguageDevelopment.examples')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Combinação de duas palavras
          </label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.twoWordCombination')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Idade aproximada (meses)
          </label>
          <input
            type="number"
            min="0"
            {...register(
              'communicationDevelopment.earlyLanguageDevelopment.twoWordCombinationAge',
              { valueAsNumber: true },
            )}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Primeiras frases</label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.firstSentences')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Idade aproximada (meses)
          </label>
          <input
            type="number"
            min="0"
            {...register('communicationDevelopment.earlyLanguageDevelopment.firstSentencesAge', {
              valueAsNumber: true,
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Crescimento do vocabulário
          </label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.vocabularyGrowth')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            <option value="rápido">Rápido</option>
            <option value="lento">Lento</option>
            <option value="estagnado">Estagnado</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimativa de palavras compreendidas
          </label>
          <input
            type="number"
            min="0"
            {...register(
              'communicationDevelopment.earlyLanguageDevelopment.estimatedUnderstoodWords',
              { valueAsNumber: true },
            )}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimativa de palavras produzidas
          </label>
          <input
            type="number"
            min="0"
            {...register(
              'communicationDevelopment.earlyLanguageDevelopment.estimatedProducedWords',
              { valueAsNumber: true },
            )}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Atenção: Estes dados são relatos familiares e não substituem avaliação formal de
        vocabulário.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Uso funcional das palavras
          </label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.functionalWordUse')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Perda de palavras previamente adquiridas
          </label>
          <select
            {...register('communicationDevelopment.earlyLanguageDevelopment.wordLoss')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {YES_NO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {wordLoss === 'sim' && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Idade aproximada da regressão (meses) *
              </label>
              <input
                type="number"
                min="0"
                {...register('communicationDevelopment.earlyLanguageDevelopment.wordLossAge', {
                  valueAsNumber: true,
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError('communicationDevelopment.earlyLanguageDevelopment.wordLossAge') && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    getError(
                      'communicationDevelopment.earlyLanguageDevelopment.wordLossAge',
                    ) as string
                  }
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Palavras ou funções perdidas *
              </label>
              <textarea
                {...register(
                  'communicationDevelopment.earlyLanguageDevelopment.lostWordsOrFunctions',
                )}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {getError(
                'communicationDevelopment.earlyLanguageDevelopment.lostWordsOrFunctions',
              ) && (
                <p className="mt-1 text-sm text-red-600">
                  {
                    getError(
                      'communicationDevelopment.earlyLanguageDevelopment.lostWordsOrFunctions',
                    ) as string
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Observações gerais sobre linguagem inicial
          {(estimatedProducedWords || 0) > 3000 && (
            <span className="text-red-500 ml-1">
              * (Necessário justificar estimativa superior a 3000 palavras)
            </span>
          )}
        </label>
        <textarea
          {...register('communicationDevelopment.earlyLanguageDevelopment.observations')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {getError('communicationDevelopment.earlyLanguageDevelopment.observations') && (
          <p className="mt-1 text-sm text-red-600">
            {getError('communicationDevelopment.earlyLanguageDevelopment.observations') as string}
          </p>
        )}
      </div>
    </div>
  )
}
