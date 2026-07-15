import { useFormContext } from 'react-hook-form';
import { LANGUAGE_SKILL_STATUS, YES_NO_OPTIONS, LANGUAGE_SUPPORT_TYPES } from '../constants';

interface LanguageSkillFieldProps {
  label: string;
  name: string;
}

export function LanguageSkillField({ label, name }: LanguageSkillFieldProps) {
  const { register, watch } = useFormContext();

  // "name" will be something like "languageDevelopment.receptiveLanguage.respondsToName"
  const needsSupportPath = `${name}.needsSupport`;
  const supportTypePath = `${name}.supportType`;
  
  const needsSupportValue = watch(needsSupportPath);
  const supportTypeValues = watch(supportTypePath) || [];
  
  const showSupportFields = needsSupportValue === 'sim';
  const showOtherSupport = Array.isArray(supportTypeValues) && supportTypeValues.includes('outro');

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
      <p className="font-semibold text-gray-800 mb-4">{label}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status da Habilidade</label>
          <select
            {...register(`${name}.status`)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecione...</option>
            {LANGUAGE_SKILL_STATUS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contexto</label>
          <input
            type="text"
            {...register(`${name}.context`)}
            placeholder="Em qual contexto ocorre?"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Observações adicionais</label>
        <textarea
          {...register(`${name}.observation`)}
          rows={2}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Exemplos, descrições detalhadas..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Necessita de apoio?</label>
        <div className="flex gap-4">
          {YES_NO_OPTIONS.map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                value={option}
                {...register(needsSupportPath)}
                className="mr-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {showSupportFields && (
        <div className="bg-white p-4 border border-gray-200 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipos de Apoio Utilizados</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {LANGUAGE_SUPPORT_TYPES.map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  {...register(supportTypePath)}
                  className="mr-2 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
          
          {showOtherSupport && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qual outro apoio?</label>
              <input
                type="text"
                {...register(`${name}.otherSupportDescription`)}
                placeholder="Descreva o apoio"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
