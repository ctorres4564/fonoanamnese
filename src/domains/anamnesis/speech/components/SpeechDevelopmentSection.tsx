import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { SpeechDevelopmentSection as SpeechSectionType } from '../types';
import { speechDevelopmentSchema } from '../schema';

import { SpeechHistoryFields } from './SpeechHistoryFields';
import { SpeechIntelligibilityFields } from './SpeechIntelligibilityFields';
import { ReportedSpeechErrorsFields } from './ReportedSpeechErrorsFields';
import { PhonologicalPatternsFields } from './PhonologicalPatternsFields';
import { SoundClassesFields } from './SoundClassesFields';
import { SpeechConsistencyFields } from './SpeechConsistencyFields';
import { MotorSpeechFields } from './MotorSpeechFields';
import { SpeechRateRhythmFields } from './SpeechRateRhythmFields';
import { SpeechFunctionalImpactFields } from './SpeechFunctionalImpactFields';
import { SpeechFamilyHistoryFields } from './SpeechFamilyHistoryFields';
import { PreviousSpeechInterventionFields } from './PreviousSpeechInterventionFields';
import { SpeechSampleFields } from './SpeechSampleFields';

interface SpeechDevelopmentSectionProps {
  initialData?: SpeechSectionType;
  onChange: (data: SpeechSectionType, isValid: boolean) => void;
}

export function SpeechDevelopmentSection({ initialData, onChange }: SpeechDevelopmentSectionProps) {
  const methods = useForm<{ speechDevelopment: SpeechSectionType }>({
    resolver: zodResolver(z.object({ speechDevelopment: speechDevelopmentSchema })) as any,
    defaultValues: {
      speechDevelopment: initialData || {} as SpeechSectionType
    },
    mode: 'onChange',
  });

  const { watch, register } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      const parsed = speechDevelopmentSchema.safeParse(value.speechDevelopment);
      onChange(value.speechDevelopment as SpeechSectionType, parsed.success);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  useEffect(() => {
    const parsed = speechDevelopmentSchema.safeParse(initialData || {});
    onChange(initialData || {} as SpeechSectionType, parsed.success);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="mb-4 text-sm text-gray-500">
          Esta seção avalia o desenvolvimento da fala, clareza, aspectos fonológicos, motores e o impacto funcional.
        </div>

        <SpeechHistoryFields />
        <SpeechIntelligibilityFields />
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">3. Alterações de Fala Relatadas e Padrões</h3>
          <ReportedSpeechErrorsFields />
          <div className="border-t pt-6">
            <PhonologicalPatternsFields />
          </div>
          <div className="border-t pt-6">
            <SoundClassesFields />
          </div>
        </div>

        <SpeechConsistencyFields />
        <MotorSpeechFields />
        <SpeechRateRhythmFields />
        <SpeechFunctionalImpactFields />
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">8. Histórico Familiar e Intervenções</h3>
          <SpeechFamilyHistoryFields />
          <div className="border-t pt-6">
            <PreviousSpeechInterventionFields />
          </div>
        </div>

        <SpeechSampleFields />

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          <h4 className="font-semibold text-sm border-b pb-2 text-gray-800">Síntese e Encaminhamentos (Exclusivo do Avaliador)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needsPhonologicalEvaluation"
                {...register('speechDevelopment.needsPhonologicalEvaluation')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="needsPhonologicalEvaluation" className="text-sm font-medium text-gray-700">
                Indica necessidade de avaliação fonológica formal
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needsArticulatoryEvaluation"
                {...register('speechDevelopment.needsArticulatoryEvaluation')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="needsArticulatoryEvaluation" className="text-sm font-medium text-gray-700">
                Indica necessidade de avaliação articulatória (fonética)
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needsMotorSpeechEvaluation"
                {...register('speechDevelopment.needsMotorSpeechEvaluation')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="needsMotorSpeechEvaluation" className="text-sm font-medium text-gray-700">
                Indica necessidade de avaliação motora da fala (AFI/Disartria)
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="needsHearingEvaluation"
                {...register('speechDevelopment.needsHearingEvaluation')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="needsHearingEvaluation" className="text-sm font-medium text-gray-700">
                Indica necessidade de avaliação audiológica
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limitações da coleta destas informações
            </label>
            <textarea
              {...register('speechDevelopment.observationLimitations')}
              rows={3}
              placeholder="Ex: Família com dificuldade de fornecer exemplos consistentes"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

