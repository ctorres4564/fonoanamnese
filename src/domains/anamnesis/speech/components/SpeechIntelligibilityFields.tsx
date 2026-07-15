import { useFormContext } from 'react-hook-form';
import { INTELLIGIBILITY_LEVEL_OPTIONS, FREQUENCY_SCALE_OPTIONS } from '../constants';
import type { SpeechIntelligibilityLevel, SpeechIntelligibilityContext } from '../types';

export function SpeechIntelligibilityFields() {
  const { register } = useFormContext<{ intelligibility: { levels: SpeechIntelligibilityLevel, context: SpeechIntelligibilityContext } }>();

  const levelFields = [
    { name: 'forParents', label: 'Para os pais' },
    { name: 'forCloseFamily', label: 'Para familiares prÃ³ximos' },
    { name: 'forTeachers', label: 'Para professores' },
    { name: 'forStrangers', label: 'Para estranhos' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-sm">NÃ­vel de Inteligibilidade por Interlocutor</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levelFields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <select {...register(`intelligibility.levels.${field.name}` as any)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Selecione...</option>
                {INTELLIGIBILITY_LEVEL_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Contextos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pede repetiÃ§Ã£o da fala?</label>
            <select {...register('intelligibility.context.needsRepetition')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Selecione...</option>
              {FREQUENCY_SCALE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usa gestos para compensar?</label>
            <select {...register('intelligibility.context.needsInterpretation')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Selecione...</option>
              {FREQUENCY_SCALE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Se frustra quando nÃ£o Ã© entendido?</label>
            <select {...register('intelligibility.context.showsFrustration')} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="">Selecione...</option>
              {FREQUENCY_SCALE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SituaÃ§Ãµes em que a fala Ã© menos clara</label>
            <textarea {...register('intelligibility.context.worstContexts')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Impacto Funcional</label>
            <textarea {...register('intelligibility.context.functionalImpact')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos (opcional)</label>
            <textarea {...register('intelligibility.context.examples')} rows={3} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}



