import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { COMMUNICATION_FORMS, SENTENCE_COMPLEXITY_OPTIONS, YES_NO_OPTIONS } from '../constants';

export function SentenceDevelopmentFields() {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
      <div 
        className="flex justify-between items-center cursor-pointer border-b pb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">3. Extensão e Complexidade das Frases</h3>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Forma Predominante de Comunicação</label>
              <select
                {...register('languageDevelopment.sentenceDevelopment.predominantForm')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {COMMUNICATION_FORMS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Extensão Média Percebida</label>
              <input
                type="number"
                min="0"
                {...register('languageDevelopment.sentenceDevelopment.perceivedAverageLength', { valueAsNumber: true })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número Aproximado de Palavras por Frase</label>
              <input
                type="number"
                min="0"
                {...register('languageDevelopment.sentenceDevelopment.approximateWordsPerSentence', { valueAsNumber: true })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexidade</label>
              <select
                {...register('languageDevelopment.sentenceDevelopment.complexity')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {SENTENCE_COMPLEXITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presença de Erros Gramaticais Percebidos</label>
              <select
                {...register('languageDevelopment.sentenceDevelopment.hasGrammaticalErrors')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Selecione...</option>
                {YES_NO_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impacto Funcional</label>
              <textarea
                {...register('languageDevelopment.sentenceDevelopment.functionalImpact')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exemplos</label>
              <textarea
                {...register('languageDevelopment.sentenceDevelopment.examples')}
                rows={2}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
