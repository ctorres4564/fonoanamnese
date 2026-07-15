import { useFormContext } from 'react-hook-form';
import { PRESENCE_STATUS_OPTIONS } from '../constants';
import type { SpeechFunctionalImpact } from '../types';

export function SpeechFunctionalImpactFields() {
  const { register } = useFormContext<{ functionalImpact: SpeechFunctionalImpact }>();

  const impactItems = [
    { name: 'difficultyUnderstoodAtHome', label: 'Dificuldade de ser compreendido em casa' },
    { name: 'difficultyUnderstoodAtSchool', label: 'Dificuldade de ser compreendido na escola/creche' },
    { name: 'difficultyParticipatingInConversations', label: 'Dificuldade para participar de conversas' },
    { name: 'avoidsSpeaking', label: 'Evita falar' },
    { name: 'reducesResponses', label: 'Responde apenas com gestos ou palavras isoladas (reduz respostas)' },
    { name: 'showsShame', label: 'Demonstra vergonha' },
    { name: 'showsIrritation', label: 'Demonstra irritaÃ§Ã£o' },
    { name: 'showsFrustration', label: 'Demonstra frustraÃ§Ã£o' },
    { name: 'usesInterpreter', label: 'Usa um familiar como intÃ©rprete' },
    { name: 'suffersTeasing', label: 'Sofre bullying / provocaÃ§Ãµes' },
    { name: 'literacyImpact', label: 'Impacto na alfabetizaÃ§Ã£o' },
    { name: 'readingWritingImpact', label: 'Impacto na leitura e escrita' },
    { name: 'autonomyImpact', label: 'Impacto na autonomia' },
    { name: 'socialImpact', label: 'Impacto nas relaÃ§Ãµes sociais' },
    { name: 'schoolImpact', label: 'Impacto no rendimento escolar' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impactItems.map((item) => (
          <div key={item.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
            <select {...register(`functionalImpact.${item.name}` as any)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Selecione...</option>
              {PRESENCE_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SituaÃ§Ãµes de maior dificuldade (relato livre)</label>
          <textarea {...register('functionalImpact.mostDifficultSituations')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">EstratÃ©gias que a famÃ­lia usa quando nÃ£o entende</label>
          <textarea {...register('functionalImpact.familyStrategies')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ObservaÃ§Ãµes adicionais sobre o impacto</label>
        <textarea {...register('functionalImpact.observations')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
    </div>
  );
}

