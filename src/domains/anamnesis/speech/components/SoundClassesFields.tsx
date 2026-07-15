import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { SOUND_CLASSES, SOUND_CLASS_STATUS_OPTIONS } from '../constants'
import type { SoundClassObservation } from '../types'

export function SoundClassesFields() {
  const { register, control } = useFormContext<{ soundClasses: SoundClassObservation[] }>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'soundClasses',
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-sm">
          Classes de Sons (Apenas Relato/ObservaÃ§Ã£o Geral)
        </h4>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border px-3 py-1 bg-white hover:bg-gray-50"
          onClick={() =>
            append({
              soundClass: '',
              status: 'nao_observado',
              observations: '',
              examples: '',
            } as any)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Classe
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-md text-center">
          Nenhuma classe de sons adicionada.
        </div>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md relative space-y-4 bg-white">
          <button
            type="button"
            className="absolute right-2 top-2 p-2 text-red-500 hover:bg-red-50 rounded-md"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Classe de Som</label>
              <select
                {...register(`soundClasses.${index}.soundClass`)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione a classe</option>
                {SOUND_CLASSES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status (Relato/ObservaÃ§Ã£o)
              </label>
              <select
                {...register(`soundClasses.${index}.status`)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Status</option>
                {SOUND_CLASS_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ObservaÃ§Ãµes</label>
              <textarea
                {...register(`soundClasses.${index}.observations`)}
                placeholder="Dificuldades especÃ­ficas percebidas"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos</label>
              <textarea
                {...register(`soundClasses.${index}.examples`)}
                placeholder="Exemplos de erros nesta classe"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-10"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
