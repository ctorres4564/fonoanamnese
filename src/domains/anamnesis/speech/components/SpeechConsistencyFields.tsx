import { useFormContext } from 'react-hook-form';
import { FREQUENCY_SCALE_OPTIONS } from '../constants';
import type { SpeechConsistencyHistory } from '../types';

export function SpeechConsistencyFields() {
  const { register } = useFormContext<{ consistency: SpeechConsistencyHistory }>();

  const consistencyItems = [
    { name: 'sameWordSameWay', label: 'Fala a mesma palavra sempre do mesmo jeito' },
    { name: 'variesBetweenAttempts', label: 'A palavra sai diferente em tentativas seguidas' },
    { name: 'improvesWithImitation', label: 'Melhora quando imita o adulto' },
    { name: 'worsensWithLongWords', label: 'Piora em palavras mais longas' },
    { name: 'worsensInSentences', label: 'Piora quando fala em frases' },
    { name: 'worsensWithSpeed', label: 'Piora quando fala rÃ¡pido' },
    { name: 'successiveCorrectionAttempts', label: 'Faz vÃ¡rias tentativas para corrigir a palavra' },
    { name: 'showsEffort', label: 'Mostra esforÃ§o visÃ­vel para falar' },
    { name: 'abandonsDifficultWords', label: 'Desiste de falar palavras difÃ­ceis' },
    { name: 'avoidsSpeaking', label: 'Evita falar em algumas situaÃ§Ãµes' },
    { name: 'usesGesturesToCompensate', label: 'Usa gestos para compensar a dificuldade' },
    { name: 'needsVisualModel', label: 'Precisa olhar para a boca do adulto' },
    { name: 'needsRepetition', label: 'Precisa que o adulto repita vÃ¡rias vezes' },
    { name: 'needsSyllableSegmentation', label: 'Precisa que o adulto separe em sÃ­labas' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consistencyItems.map((item) => (
          <div key={item.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
            <select {...register(`consistency.${item.name}` as any)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">FrequÃªncia</option>
              {FREQUENCY_SCALE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

