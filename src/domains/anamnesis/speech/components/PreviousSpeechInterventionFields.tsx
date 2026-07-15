import { useFormContext } from 'react-hook-form'
import type { PreviousSpeechIntervention } from '../types'

export function PreviousSpeechInterventionFields() {
  const { register } = useFormContext<{ interventions: PreviousSpeechIntervention }>()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-semibold text-sm">AvaliaÃ§Ã£o Anterior</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              JÃ¡ passou por avaliaÃ§Ã£o fonoaudiolÃ³gica anterior?
            </label>
            <select
              {...register('interventions.previousEvaluation')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">NÃ£o</option>
              <option value="nao_informado">NÃ£o informado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profissional/Local
            </label>
            <input
              type="text"
              {...register('interventions.evaluationProfessional')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Possui relatÃ³rio da avaliaÃ§Ã£o?
            </label>
            <select
              {...register('interventions.hasDocument')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">NÃ£o</option>
              <option value="nao_informado">NÃ£o informado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FrequÃªncia (Ex: 1x na semana)
            </label>
            <input
              type="text"
              {...register('interventions.therapyFrequency')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              O que era trabalhado na terapia? (Objetivos relatados)
            </label>
            <input
              type="text"
              {...register('interventions.therapyObjectives')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-semibold text-sm">Terapia Atual e EstratÃ©gias</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EstÃ¡ em terapia atualmente?
            </label>
            <select
              {...register('interventions.currentTherapy')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">NÃ£o</option>
              <option value="nao_informado">NÃ£o informado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            EstratÃ©gias fonoaudiolÃ³gicas que a famÃ­lia jÃ¡ foi orientada a usar e que funcionam
          </label>
          <textarea
            {...register('interventions.helpfulStrategies')}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            A crianÃ§a jÃ¡ fez exercÃ­cios de motricidade orofacial? (mastigar algo, fazer forÃ§a,
            assoprar, etc)
          </label>
          <textarea
            {...register('interventions.previousExercises')}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Outras observaÃ§Ãµes sobre intervenÃ§Ãµes
          </label>
          <textarea
            {...register('interventions.observations')}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  )
}
