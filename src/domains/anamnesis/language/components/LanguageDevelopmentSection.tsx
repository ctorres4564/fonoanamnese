import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ReceptiveLanguageFields } from './ReceptiveLanguageFields';
import { ExpressiveLanguageFields } from './ExpressiveLanguageFields';
import { SentenceDevelopmentFields } from './SentenceDevelopmentFields';
import { VocabularyHistoryFields } from './VocabularyHistoryFields';
import { NarrativeDevelopmentFields } from './NarrativeDevelopmentFields';
import { FunctionalLanguageFields } from './FunctionalLanguageFields';
import { LanguageDifficultiesFields } from './LanguageDifficultiesFields';
import { LanguageRegressionFields } from './LanguageRegressionFields';
import { LanguageSupportStrategiesFields } from './LanguageSupportStrategiesFields';

import type { LanguageDevelopmentSection as LanguageSectionType } from '../types';
import { languageDevelopmentSchema } from '../schema';
import { YES_NO_OPTIONS } from '../constants';

interface LanguageDevelopmentSectionProps {
  initialData?: LanguageSectionType;
  onChange: (data: LanguageSectionType, isValid: boolean) => void;
}

export function LanguageDevelopmentSection({ initialData, onChange }: LanguageDevelopmentSectionProps) {
  const methods = useForm<{ languageDevelopment: LanguageSectionType }>({
    resolver: zodResolver(z.object({ languageDevelopment: languageDevelopmentSchema })),
    defaultValues: {
      languageDevelopment: initialData || {}
    },
    mode: 'onChange',
  });

  const { watch, register } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      const parsed = languageDevelopmentSchema.safeParse(value.languageDevelopment);
      onChange(value.languageDevelopment as LanguageSectionType, parsed.success);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  useEffect(() => {
    const parsed = languageDevelopmentSchema.safeParse(initialData || {});
    onChange(initialData || {}, parsed.success);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <ReceptiveLanguageFields />
        <ExpressiveLanguageFields />
        <SentenceDevelopmentFields />
        <VocabularyHistoryFields />
        <NarrativeDevelopmentFields />
        <FunctionalLanguageFields />
        <LanguageDifficultiesFields />
        <LanguageRegressionFields />
        <LanguageSupportStrategiesFields />

        {/* 10. Relato vs Observação */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b pb-2">10. Relato vs Observação Inicial</h3>
          
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dados Relatados pela Família</label>
              <textarea
                {...register('languageDevelopment.reportVsObservation.familyReportData')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Informações da Escola</label>
              <textarea
                {...register('languageDevelopment.reportVsObservation.schoolInformation')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observação Inicial do Fonoaudiólogo</label>
              <textarea
                {...register('languageDevelopment.reportVsObservation.professionalInitialObservation')}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Limitações da Observação</label>
              <textarea
                {...register('languageDevelopment.reportVsObservation.observationLimitations')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Necessidade de Avaliação Complementar?</label>
              <select
                {...register('languageDevelopment.reportVsObservation.needsComplementaryEvaluation')}
                className="w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
