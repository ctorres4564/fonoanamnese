import { useFormContext } from 'react-hook-form'
import type { NeonatalHistory } from '../..'

export function NeonatalHistorySection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<{ neonatal: NeonatalHistory }>()

  const tubeFeeding = watch('neonatal.tubeFeeding')
  const neonatalInfections = watch('neonatal.neonatalInfections')
  const seizures = watch('neonatal.seizures')
  const newbornHearingScreening = watch('neonatal.newbornHearingScreening')
  const tongueTieTest = watch('neonatal.tongueTieTest')

  const showHearingWarning =
    newbornHearingScreening === 'falhou' || newbornHearingScreening === 'inconclusivo'
  const showSeizuresWarning = seizures === 'sim'

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">3. Período Neonatal</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Icterícia</label>
          <select
            {...register('neonatal.jaundice')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fototerapia</label>
          <select
            {...register('neonatal.phototherapy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ventilação Mecânica</label>
          <select
            {...register('neonatal.mechanicalVentilation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Intubação</label>
          <select
            {...register('neonatal.intubation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Uso de sonda</label>
          <select
            {...register('neonatal.tubeFeeding')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {tubeFeeding === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo e duração da sonda *
            </label>
            <input
              type="text"
              {...register('neonatal.tubeTypeAndDuration')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.neonatal?.tubeTypeAndDuration && (
              <p className="mt-1 text-sm text-red-600">
                {errors.neonatal.tubeTypeAndDuration.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Infecções neonatais</label>
          <select
            {...register('neonatal.neonatalInfections')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {neonatalInfections === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descreva a infecção *</label>
            <input
              type="text"
              {...register('neonatal.neonatalInfectionsDescription')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.neonatal?.neonatalInfectionsDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.neonatal.neonatalInfectionsDescription.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Convulsões</label>
          <select
            {...register('neonatal.seizures')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {seizures === 'sim' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequência e conduta *
            </label>
            <input
              type="text"
              {...register('neonatal.seizuresFrequencyAndConduct')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.neonatal?.seizuresFrequencyAndConduct && (
              <p className="mt-1 text-sm text-red-600">
                {errors.neonatal.seizuresFrequencyAndConduct.message}
              </p>
            )}
          </div>
        )}
      </div>

      {showSeizuresWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Aviso:</strong> Histórico de convulsões neonatais. Informação relevante para
                investigação clínica.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dificuldade de sucção</label>
          <select
            {...register('neonatal.suctionDifficulty')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dificuldade de alimentação
          </label>
          <select
            {...register('neonatal.feedingDifficulty')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Baixo ganho de peso</label>
          <select
            {...register('neonatal.lowWeightGain')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alterações neurológicas</label>
          <select
            {...register('neonatal.neurologicalAlterations')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Triagem Auditiva Neonatal
          </label>
          <select
            {...register('neonatal.newbornHearingScreening')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="passou">Passou</option>
            <option value="falhou">Falhou</option>
            <option value="inconclusivo">Inconclusivo</option>
            <option value="não realizado">Não realizado</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Detalhes do resultado</label>
          <input
            type="text"
            {...register('neonatal.hearingScreeningResult')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {showHearingWarning && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Necessidade de reteste / Conduta
            </label>
            <input
              type="text"
              {...register('neonatal.hearingScreeningRetestNeeded')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {showHearingWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-2">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Aviso:</strong> Falha ou inconclusivo na triagem auditiva neonatal requer
                atenção para desenvolvimento de fala e linguagem.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teste da Linguinha</label>
          <select
            {...register('neonatal.tongueTieTest')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="normal">Normal</option>
            <option value="alterado">Alterado</option>
            <option value="não realizado">Não realizado</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        {tongueTieTest === 'alterado' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição / Conduta</label>
            <input
              type="text"
              {...register('neonatal.tongueTieTestResult')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teste do Pezinho</label>
          <select
            {...register('neonatal.newbornBloodSpotTest')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="normal">Normal</option>
            <option value="alterado">Alterado</option>
            <option value="não realizado">Não realizado</option>
            <option value="não informado">Não informado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição do resultado</label>
          <input
            type="text"
            {...register('neonatal.bloodSpotTestResult')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Outras intercorrências neonatais
        </label>
        <input
          type="text"
          {...register('neonatal.otherComplications')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Observações gerais (Período Neonatal)
        </label>
        <textarea
          {...register('neonatal.observations')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  )
}
