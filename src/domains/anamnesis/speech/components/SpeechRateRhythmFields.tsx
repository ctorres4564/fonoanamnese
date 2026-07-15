import { useFormContext } from 'react-hook-form';
import type { SpeechRateRhythm } from '../types';

export function SpeechRateRhythmFields() {
  const { register } = useFormContext<{ rateAndRhythm: SpeechRateRhythm }>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Velocidade da fala (Taxa)</label>
      <textarea {...register('rateAndRhythm.rate')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Pausas</label>
      <textarea {...register('rateAndRhythm.pauses')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">EsforÃ§o geral</label>
      <textarea {...register('rateAndRhythm.effort')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">ObservaÃ§Ãµes adicionais</label>
      <textarea {...register('rateAndRhythm.observations')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
    </div>
      </div>
    </div>
  );
}

