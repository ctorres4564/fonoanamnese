import { useFormContext } from 'react-hook-form'
import type { CommunicationDevelopmentSection } from '../types'
import { COMMUNICATION_BEHAVIOR_STATUS } from '../constants'

const behaviors = [
  { key: 'socialSmile', label: 'Sorriso social' },
  { key: 'eyeContact', label: 'Contato ocular' },
  { key: 'nameResponse', label: 'Resposta ao nome' },
  { key: 'jointAttention', label: 'Atenção compartilhada' },
  { key: 'eyeTracking', label: 'Seguimento do olhar' },
  { key: 'gestureImitation', label: 'Imitação de gestos' },
  { key: 'soundImitation', label: 'Imitação de sons' },
  { key: 'pointToRequest', label: 'Apontar para pedir' },
  { key: 'pointToShareInterest', label: 'Apontar para compartilhar interesse' },
  { key: 'conventionalGestures', label: 'Uso de gestos convencionais' },
  { key: 'communicativeFacialExpression', label: 'Expressão facial comunicativa' },
  { key: 'communicativeInitiative', label: 'Iniciativa comunicativa' },
  { key: 'responseToOtherInitiative', label: 'Resposta à iniciativa do outro' },
  { key: 'turnTaking', label: 'Alternância de turnos' },
  { key: 'communicativeIntent', label: 'Intenção comunicativa' },
  { key: 'communicativeVocalizations', label: 'Vocalizações com função comunicativa' },
  { key: 'spontaneousInteractionSeeking', label: 'Busca espontânea por interação' },
  { key: 'useAdultAsTool', label: 'Uso do adulto como instrumento' },
  { key: 'shareObjectsOrInterests', label: 'Compartilhamento de objetos ou interesses' },
]

export function PreLinguisticCommunicationFields() {
  const { register } = useFormContext<{
    communicationDevelopment: CommunicationDevelopmentSection
  }>()

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
        1. Comunicação Pré-Linguística
      </h3>

      <div className="space-y-6">
        {behaviors.map(({ key, label }) => (
          <div
            key={key}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start border-b border-gray-100 pb-4 last:border-0"
          >
            <div>
              <p className="font-medium text-sm text-gray-700 mb-2">{label}</p>
              <select
                {...register(
                  `communicationDevelopment.preLinguisticCommunication.${key}.status` as any,
                )}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {COMMUNICATION_BEHAVIOR_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-medium text-sm text-gray-700 mb-2">Observação complementar</p>
              <textarea
                {...register(
                  `communicationDevelopment.preLinguisticCommunication.${key}.observation` as any,
                )}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Observações (opcional)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
