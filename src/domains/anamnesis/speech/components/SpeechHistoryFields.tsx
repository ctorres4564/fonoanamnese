import { useFormContext } from 'react-hook-form';
import { SPEECH_DEVELOPMENT_EVOLUTION_OPTIONS, SPEECH_EVOLUTION_STATUS_OPTIONS, SPEECH_ONSET_MODE_OPTIONS } from '../constants';
import type { SpeechDevelopmentHistory } from '../types';

export function SpeechHistoryFields() {
  const { register, watch } = useFormContext<{ history: SpeechDevelopmentHistory }>();

  const developmentPerception = watch('history.developmentPerception');
  const onsetMode = watch('history.onsetMode');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade aprox. 1Âªs palavras (meses)</label>
          <input type="number" min={0} {...register('history.firstWordsAgeMonths', { setValueAs: v => v === "" ? undefined : parseFloat(v) })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade aprox. combinaÃ§Ãµes (meses)</label>
          <input type="number" min={0} {...register('history.firstCombinationsAgeMonths', { setValueAs: v => v === "" ? undefined : parseFloat(v) })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade aprox. frases (meses)</label>
          <input type="number" min={0} {...register('history.firstSentencesAgeMonths', { setValueAs: v => v === "" ? undefined : parseFloat(v) })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">PercepÃ§Ã£o do desenvolvimento</label>
        <div className="flex flex-col space-y-2">
          {SPEECH_DEVELOPMENT_EVOLUTION_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center space-x-3">
              <input type="radio" value={opt.value} {...register('history.developmentPerception')} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {developmentPerception === 'houve_regressao' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descreva a regressÃ£o (obrigatÃ³rio)</label>
          <textarea {...register('history.regressionDescription')} rows={3} placeholder="Quais habilidades ou produÃ§Ãµes foram perdidas?" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade em que dificuldade foi percebida (meses)</label>
          <input type="number" min={0} {...register('history.difficultyPerceivedAtAgeMonths', { setValueAs: v => v === "" ? undefined : parseFloat(v) })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quem percebeu a dificuldade?</label>
          <input type="text" {...register('history.whoPerceivedDifficulty')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status de evoluÃ§Ã£o atual</label>
        <div className="flex flex-col space-y-2">
          {SPEECH_EVOLUTION_STATUS_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center space-x-3">
              <input type="radio" value={opt.value} {...register('history.evolutionStatus')} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Modo de inÃ­cio</label>
        <div className="flex flex-col space-y-2">
          {SPEECH_ONSET_MODE_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center space-x-3">
              <input type="radio" value={opt.value} {...register('history.onsetMode')} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm font-medium text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {onsetMode === 'outro' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Outro modo de inÃ­cio (obrigatÃ³rio)</label>
          <input type="text" {...register('history.otherOnsetModeDescription')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos relatados pela famÃ­lia</label>
        <textarea {...register('history.familyExamples')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ObservaÃ§Ãµes sobre histÃ³rico</label>
        <textarea {...register('history.observations')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
    </div>
  );
}

