import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { PHONOLOGICAL_PATTERNS, PRESENCE_STATUS_OPTIONS, FREQUENCY_SCALE_OPTIONS } from '../constants';
import type { PhonologicalPatternObservation } from '../types';

export function PhonologicalPatternsFields() {
  const { register, control } = useFormContext<{ phonologicalPatterns: PhonologicalPatternObservation[] }>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phonologicalPatterns',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-sm">PadrÃµes FonolÃ³gicos Observados/Relatados</h4>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border px-3 py-1 bg-white hover:bg-gray-50"
          onClick={() => append({
            pattern: '',
            status: 'nao_observado',
            frequency: 'nao_observado',
            context: '',
            examples: ''
          } as any)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar PadrÃ£o
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-md text-center">
          Nenhum padrÃ£o fonolÃ³gico adicionado.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PadrÃ£o</label>
              <select {...register(`phonologicalPatterns.${index}.pattern`)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Selecione o padrÃ£o</option>
                {PHONOLOGICAL_PATTERNS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select {...register(`phonologicalPatterns.${index}.status`)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Status</option>
                {PRESENCE_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">FrequÃªncia</label>
              <select {...register(`phonologicalPatterns.${index}.frequency`)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">FrequÃªncia</option>
                {FREQUENCY_SCALE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contexto onde mais ocorre</label>
              <input type="text" {...register(`phonologicalPatterns.${index}.context`)} placeholder="Ex: no inÃ­cio da palavra" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos prÃ¡ticos</label>
              <textarea {...register(`phonologicalPatterns.${index}.examples`)} placeholder="Ex: pato -> bato" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

