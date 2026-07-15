import { useFormContext } from 'react-hook-form';
import { PRESENCE_STATUS_OPTIONS } from '../constants';
import type { MotorSpeechObservation } from '../types';

export function MotorSpeechFields() {
  const { register } = useFormContext<{ motorAspects: MotorSpeechObservation }>();

  const motorItems = [
    { name: 'difficultyImitatingMouth', label: 'Dificuldade para imitar movimentos da boca' },
    { name: 'difficultyImitatingSounds', label: 'Dificuldade para imitar sons' },
    { name: 'difficultySequencingSyllables', label: 'Dificuldade em sequenciar sÃ­labas' },
    { name: 'difficultyAlternatingMovements', label: 'Dificuldade em alternar movimentos articulatorios' },
    { name: 'articulatoryEffort', label: 'EsforÃ§o articulatÃ³rio evidente' },
    { name: 'gropingMovements', label: 'Movimentos de tateio (procura a posiÃ§Ã£o do som)' },
    { name: 'pausesBetweenSyllables', label: 'Pausas inadequadas entre as sÃ­labas' },
    { name: 'unusualSegmentation', label: 'SegmentaÃ§Ã£o incomum da palavra' },
    { name: 'inconsistentErrors', label: 'Erros inconsistentes' },
    { name: 'associatedProsodyAlterations', label: 'AlteraÃ§Ãµes na melodia/entonaÃ§Ã£o (prosÃ³dia)' },
    { name: 'worsensWithComplexity', label: 'Piora conforme a palavra fica mais complexa' },
    { name: 'betterAutomaticSpeech', label: 'Fala automÃ¡tica (ex: contar, cantar) Ã© melhor' },
    { name: 'betterSpontaneousSpeech', label: 'Fala espontÃ¢nea Ã© melhor que a repetiÃ§Ã£o' },
    { name: 'speechBreathingCoordination', label: 'Falta de coordenaÃ§Ã£o entre respiraÃ§Ã£o e fala' },
    { name: 'fatigueDuringProlongedSpeech', label: 'CansaÃ§o ao falar por mais tempo' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {motorItems.map((item) => (
          <div key={item.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
            <select {...register(`motorAspects.${item.name}` as any)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Selecione...</option>
              {PRESENCE_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contexto em que os sinais sÃ£o mais evidentes</label>
          <input type="text" {...register('motorAspects.context')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos dos comportamentos motores</label>
          <textarea {...register('motorAspects.examples')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Outras observaÃ§Ãµes motoras</label>
        <textarea {...register('motorAspects.observations')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register('motorAspects.needsSpecificEvaluation')} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        <label className="text-sm font-medium text-gray-700">
          Sinalizar necessidade de avaliaÃ§Ã£o motora da fala especÃ­fica (Apraxia/Disartria)
        </label>
      </div>
    </div>
  );
}

