import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LanguageSkillField } from './LanguageSkillField';
import { YES_NO_OPTIONS } from '../constants';

export function FunctionalLanguageFields() {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">6. Uso Funcional da Linguagem</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <h4 className="font-medium text-md text-gray-700">Funções e Adaptação</h4>
            <LanguageSkillField label="Usa linguagem para pedir" name="languageDevelopment.functionalLanguageUse.requests" />
            <LanguageSkillField label="Usa linguagem para recusar" name="languageDevelopment.functionalLanguageUse.refuses" />
            <LanguageSkillField label="Usa linguagem para compartilhar" name="languageDevelopment.functionalLanguageUse.shares" />
            <LanguageSkillField label="Usa linguagem para informar" name="languageDevelopment.functionalLanguageUse.informs" />
            <LanguageSkillField label="Usa linguagem para perguntar" name="languageDevelopment.functionalLanguageUse.asks" />
            <LanguageSkillField label="Usa linguagem para responder" name="languageDevelopment.functionalLanguageUse.answers" />
            <LanguageSkillField label="Usa linguagem para negociar" name="languageDevelopment.functionalLanguageUse.negotiates" />
            <LanguageSkillField label="Usa linguagem para expressar emoções" name="languageDevelopment.functionalLanguageUse.expressesEmotions" />
            <LanguageSkillField label="Usa linguagem para relatar desconforto" name="languageDevelopment.functionalLanguageUse.reportsDiscomfort" />
            <LanguageSkillField label="Usa linguagem para resolver conflitos" name="languageDevelopment.functionalLanguageUse.resolvesConflicts" />
            <LanguageSkillField label="Adapta a linguagem ao interlocutor" name="languageDevelopment.functionalLanguageUse.adaptsToInterlocutor" />
            <LanguageSkillField label="Adapta a linguagem ao ambiente" name="languageDevelopment.functionalLanguageUse.adaptsToEnvironment" />
          </div>

          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700 mb-4">Comunicação nos Ambientes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'functionalAtHome', label: 'Funcional em Casa?' },
                { key: 'functionalAtSchool', label: 'Funcional na Escola?' },
                { key: 'functionalInSocialEnvironments', label: 'Funcional Socialmente?' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <select
                    {...register(`languageDevelopment.functionalLanguageUse.${item.key}`)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Selecione...</option>
                    {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-md text-gray-700 mb-4">Impactos</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                { key: 'autonomyImpact', label: 'Impacto na Autonomia' },
                { key: 'schoolParticipationImpact', label: 'Impacto na Participação Escolar' },
                { key: 'socialInteractionImpact', label: 'Impacto na Interação Social' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
                  <textarea
                    {...register(`languageDevelopment.functionalLanguageUse.${item.key}`)}
                    rows={2}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
