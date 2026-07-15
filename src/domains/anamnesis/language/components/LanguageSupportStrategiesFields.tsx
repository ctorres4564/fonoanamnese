import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { LANGUAGE_SUPPORT_TYPES } from '../constants'

export function LanguageSupportStrategiesFields() {
  const { register, watch } = useFormContext()
  const [isOpen, setIsOpen] = useState(false)

  const supportsUsed = watch('languageDevelopment.languageSupportStrategies.supportsUsed') || []
  const showOtherSupport = Array.isArray(supportsUsed) && supportsUsed.includes('outro')

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">9. Apoios Utilizados</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="space-y-6 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apoios frequentemente utilizados para facilitar a comunicação
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {LANGUAGE_SUPPORT_TYPES.map((opt) => (
                <label key={opt} className="flex items-center">
                  <input
                    type="checkbox"
                    value={opt}
                    {...register('languageDevelopment.languageSupportStrategies.supportsUsed')}
                    className="mr-2 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {showOtherSupport && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qual outro apoio?
              </label>
              <input
                type="text"
                {...register(
                  'languageDevelopment.languageSupportStrategies.otherSupportDescription',
                )}
                placeholder="Descreva o apoio utilizado"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apoio mais eficaz
              </label>
              <input
                type="text"
                {...register('languageDevelopment.languageSupportStrategies.mostEffectiveSupport')}
                placeholder="Ex: Pistas visuais"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quem utiliza os apoios?
              </label>
              <input
                type="text"
                {...register('languageDevelopment.languageSupportStrategies.whoUses')}
                placeholder="Ex: Mãe, professora"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ambientes em que são usados
              </label>
              <textarea
                {...register('languageDevelopment.languageSupportStrategies.environments')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
              <textarea
                {...register('languageDevelopment.languageSupportStrategies.frequency')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resposta da Criança
              </label>
              <textarea
                {...register('languageDevelopment.languageSupportStrategies.childResponse')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações Adicionais
              </label>
              <textarea
                {...register('languageDevelopment.languageSupportStrategies.observations')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
