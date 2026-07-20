import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getAnamnesisById,
  updateAnamnesis,
  finalizeAnamnesis,
} from '../../services/anamnesisService'
import { getPatientById } from '../../services/patientService'
import { ACTIVE_ANAMNESIS_SECTIONS, type Anamnesis, type ActualAnamnesisSection } from '../../domains/anamnesis'
import type { Patient } from '../../types'
import { useAuth } from '../../contexts/AuthContext'
import { validateSection } from '../../utils/validation'
import type { SectionValidationResult } from '../../utils/validation'
import { DiagnosticSummary } from '../../domains/anamnesis/interview/components/DiagnosticSummary'
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react'

const SECTIONS = ACTIVE_ANAMNESIS_SECTIONS

export default function AnamnesisReview() {
  const { patientId, anamnesisId } = useParams<{ patientId: string; anamnesisId: string }>()
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  const [anamnesis, setAnamnesis] = useState<Anamnesis | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)

  useEffect(() => {
    async function loadData() {
      if (!patientId || !anamnesisId) return
      try {
        setLoading(true)
        const [patientData, anamnesisData] = await Promise.all([
          getPatientById(patientId),
          getAnamnesisById(anamnesisId),
        ])

        if (!patientData) throw new Error('Paciente não encontrado')
        if (!anamnesisData) throw new Error('Anamnese não encontrada')

        // Validações de segurança e acesso
        if (anamnesisData.patientId !== patientId) {
          throw new Error('Anamnese não pertence a este paciente')
        }
        if (anamnesisData.professionalId !== user?.id) {
          throw new Error('Acesso negado. Apenas o proprietário pode revisar.')
        }

        if (anamnesisData.status === 'finalized') {
          navigate(`/patients/${patientId}/anamneses/${anamnesisId}/view`)
          return
        }

        setPatient(patientData)
        setAnamnesis(anamnesisData)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar revisão')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [patientId, anamnesisId, user, navigate])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleEditSection = async (sectionId: ActualAnamnesisSection) => {
    if (!anamnesisId) return
    try {
      // Set the current section to the clicked one, so the editor opens there
      await updateAnamnesis(anamnesisId, { currentSection: sectionId }, user?.id || '')
      navigate(`/patients/${patientId}/anamneses/${anamnesisId}/edit`)
    } catch (err) {
      console.error('Erro ao navegar para a seção', err)
    }
  }

  const handleFinalize = async () => {
    if (!anamnesisId || !user) return
    setIsFinalizing(true)
    try {
      await finalizeAnamnesis(anamnesisId, user.id)
      navigate(`/patients/${patientId}/anamneses/${anamnesisId}/view`)
    } catch (err) {
      console.error(err)
      alert('Erro ao finalizar anamnese.')
    } finally {
      setIsFinalizing(false)
      setShowConfirmModal(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Carregando revisão...</div>
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
          <h2 className="font-bold text-lg mb-2">Erro</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate(`/patients/${patientId}`)}
            className="mt-4 text-sm underline hover:text-red-800"
          >
            Voltar ao Paciente
          </button>
        </div>
      </div>
    )
  }

  if (!anamnesis || !patient) return null

  // Realiza validação estrita de cada seção
  const validations: Record<ActualAnamnesisSection, SectionValidationResult> = {} as any
  let hasIncompleteRequired = false
  let completedCount = 0

  SECTIONS.forEach((sec) => {
    const data = anamnesis.sections?.[sec.id]
    const valResult = validateSection(sec.id, data)
    validations[sec.id] = valResult
    if (valResult.isValid) {
      completedCount++
    } else {
      hasIncompleteRequired = true
    }
  })

  const canFinalize =
    !hasIncompleteRequired && profile?.crefonoNumber && anamnesis.status !== 'archived'

  return (
    <div className="py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Revisão da Anamnese</h1>
            <p className="text-gray-700">
              <strong>Paciente:</strong> {(patient as any).fullName || (patient as any).name}
            </p>
            <p className="text-gray-700">
              <strong>Prontuário:</strong> {patient.recordNumber || 'N/A'}
            </p>
            <DiagnosticSummary interviewData={anamnesis.sections.interviewData} />
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>
              <strong>Status:</strong>{' '}
              {anamnesis.status === 'draft' ? 'Rascunho' : anamnesis.status}
            </p>
            <p>
              <strong>Versão:</strong> {anamnesis.version}
            </p>
            <p>
              <strong>Seções Concluídas:</strong> {completedCount} de {SECTIONS.length}
            </p>
            <p>
              <strong>Última Atualização:</strong>{' '}
              {(anamnesis.updatedAt as any)?.toMillis
                ? new Date((anamnesis.updatedAt as any).toMillis()).toLocaleString()
                : new Date(anamnesis.updatedAt as any).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Banner Informativo de Versão Parcial (MVP) */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0 text-blue-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Nota de Versão:</strong> Esta anamnese será finalizada contendo apenas os 8
              módulos clínicos ativos atualmente implementados na versão atual do sistema. Os demais
              módulos previstos (AVDs/Sono, Alimentação, Histórico de Saúde e Familiar) ainda não
              estão disponíveis.
            </p>
          </div>
        </div>
      </div>

      {/* Avisos de Bloqueio Globais */}
      {!profile?.crefonoNumber && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Seu perfil profissional está incompleto (CREFONO ausente). Você não poderá finalizar
                a anamnese até completar seu cadastro.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Seções */}
      <div className="space-y-4 mb-8">
        {SECTIONS.map((sec) => {
          const val = validations[sec.id]
          const isExpanded = !!expandedSections[sec.id]
          const data = anamnesis.sections?.[sec.id]
          const isNotStarted = val.filledFieldsCount === 0 && !val.isValid

          return (
            <div
              key={sec.id}
              className={`border rounded-lg bg-white overflow-hidden ${
                val.isValid
                  ? 'border-green-200'
                  : isNotStarted
                    ? 'border-gray-200'
                    : 'border-yellow-200'
              }`}
            >
              <div
                className={`p-4 flex items-center justify-between cursor-pointer ${
                  val.isValid ? 'bg-green-50' : isNotStarted ? 'bg-gray-50' : 'bg-yellow-50'
                }`}
                onClick={() => toggleSection(sec.id)}
              >
                <div className="flex items-center gap-3">
                  {val.isValid ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isNotStarted ? (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <h3 className="font-medium text-gray-900">
                    {sec.label}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({val.isValid ? 'Completa' : isNotStarted ? 'Não iniciada' : 'Incompleta'})
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  {val.filledFieldsCount > 0 && (
                    <span className="text-xs text-gray-500">
                      {val.filledFieldsCount} campos preenchidos
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-gray-100 bg-white">
                  {!val.isValid && val.errors.length > 0 && (
                    <div className="mb-4 bg-red-50 p-3 rounded-md border border-red-100">
                      <h4 className="text-sm font-medium text-red-800 mb-1 flex items-center gap-1">
                        <XCircle className="h-4 w-4" /> Pendências nesta seção:
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                        {val.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resumo seguro dos dados preenchidos (se houver) */}
                  {data && val.filledFieldsCount > 0 && (
                    <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">
                      <p className="font-medium text-gray-700 mb-1">Dados registrados:</p>
                      <pre className="whitespace-pre-wrap font-sans text-xs">
                        {/* Exibe um slice simplificado das chaves para evitar vazamento de tela inteira */}
                        {JSON.stringify(
                          Object.fromEntries(
                            Object.entries(data).filter(
                              ([_, v]) => v !== undefined && v !== '' && v !== null,
                            ),
                          ),
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection(sec.id)
                      }}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1.5 border border-indigo-200 rounded bg-indigo-50 hover:bg-indigo-100 transition"
                    >
                      Revisar esta seção
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Ações Finais */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/patients/${patientId}`)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Voltar ao Paciente
          </button>
          <button
            onClick={() => navigate(`/patients/${patientId}/anamneses`)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Voltar à Lista
          </button>
          <button
            onClick={() => navigate(`/patients/${patientId}/anamneses/${anamnesisId}/edit`)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
          >
            Voltar ao Editor
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/patients/${patientId}/anamneses`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Salvar como Rascunho
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={!canFinalize}
            className={`px-6 py-2 rounded-md text-sm font-medium text-white transition ${
              canFinalize
                ? 'bg-green-600 hover:bg-green-700 shadow-sm'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            title={!canFinalize ? 'Resolva as pendências antes de finalizar' : ''}
          >
            Finalizar Anamnese
          </button>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Finalizar Anamnese
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Após a finalização, esta versão não poderá ser editada diretamente. Qualquer
                        correção futura deverá gerar uma nova versão da anamnese. Deseja realmente
                        finalizar?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isFinalizing}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={handleFinalize}
                >
                  {isFinalizing ? 'Finalizando...' : 'Confirmar Finalização'}
                </button>
                <button
                  type="button"
                  disabled={isFinalizing}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
