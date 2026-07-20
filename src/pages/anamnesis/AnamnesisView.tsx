import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnamnesisById } from '../../services/anamnesisService'
import { getPatientById } from '../../services/patientService'
import { ACTIVE_ANAMNESIS_SECTIONS, type Anamnesis, type ActualAnamnesisSection } from '../../domains/anamnesis'
import type { Patient } from '../../types'
import { useAuth } from '../../contexts/AuthContext'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { DiagnosticSummary } from '../../domains/anamnesis/interview/components/DiagnosticSummary'

const SECTIONS = ACTIVE_ANAMNESIS_SECTIONS

export default function AnamnesisView() {
  const { patientId, anamnesisId } = useParams<{ patientId: string; anamnesisId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [anamnesis, setAnamnesis] = useState<Anamnesis | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

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

        if (anamnesisData.patientId !== patientId) {
          throw new Error('Anamnese não pertence a este paciente')
        }
        if (anamnesisData.professionalId !== user?.id) {
          throw new Error('Acesso negado. Você não tem permissão para visualizar esta anamnese.')
        }

        setPatient(patientData)
        setAnamnesis(anamnesisData)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [patientId, anamnesisId, user])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const renderSectionSummary = (_sectionId: ActualAnamnesisSection, data: any) => {
    if (!data || Object.keys(data).length === 0) {
      return <p className="text-gray-500 italic text-sm">Seção não preenchida.</p>
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
        {Object.entries(data).map(([key, value]) => {
          if (value === undefined || value === null || value === '') return null

          let displayVal = ''
          if (typeof value === 'boolean') {
            displayVal = value ? 'Sim' : 'Não'
          } else if (Array.isArray(value)) {
            displayVal = value.join(', ')
          } else if (typeof value === 'object') {
            displayVal = JSON.stringify(value)
          } else {
            displayVal = String(value)
          }

          // Format label from camelCase to Title Case
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())

          return (
            <div key={key} className="border-b border-gray-100 pb-2">
              <span className="font-semibold text-gray-800">{label}:</span>{' '}
              <span className="text-gray-600">{displayVal}</span>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 font-medium">Carregando visualização da anamnese...</p>
      </div>
    )
  }

  if (error || !anamnesis || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm border border-red-200 text-center">
          <h2 className="text-lg font-bold text-red-600 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-4">{error || 'Dados inválidos.'}</p>
          <button
            onClick={() => navigate(`/patients/${patientId}/anamneses`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm font-medium"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  const formattedFinalizedDate = anamnesis.finalizedAt
    ? (anamnesis.finalizedAt as any).toMillis
      ? new Date((anamnesis.finalizedAt as any).toMillis()).toLocaleString()
      : new Date(anamnesis.finalizedAt as any).toLocaleString()
    : null

  const formattedUpdatedDate = anamnesis.updatedAt
    ? (anamnesis.updatedAt as any).toMillis
      ? new Date((anamnesis.updatedAt as any).toMillis()).toLocaleString()
      : new Date(anamnesis.updatedAt as any).toLocaleString()
    : null

  return (
    <div className="py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">Anamnese Finalizada</h1>
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-gray-700">
              <strong>Paciente:</strong> {(patient as any).fullName || (patient as any).name}
            </p>
            <p className="text-gray-700">
              <strong>Prontuário:</strong> {patient.recordNumber || 'N/A'}
            </p>
            <DiagnosticSummary interviewData={anamnesis.sections.interviewData} />
          </div>
          <div className="text-left md:text-right text-sm text-gray-600 border-l md:border-l-0 md:border-r border-gray-200 pl-4 md:pr-4">
            <p>
              <strong>Status:</strong>{' '}
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800">
                Finalizada
              </span>
            </p>
            <p>
              <strong>Versão:</strong> {anamnesis.version}
            </p>
            {formattedFinalizedDate && (
              <p>
                <strong>Finalizada em:</strong> {formattedFinalizedDate}
              </p>
            )}
            {formattedUpdatedDate && (
              <p>
                <strong>Última atualização:</strong> {formattedUpdatedDate}
              </p>
            )}
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
              <strong>Nota de Versão:</strong> Esta anamnese foi concluída contendo apenas os 8
              módulos clínicos ativos atualmente implementados na versão atual do sistema. Os demais
              módulos previstos (AVDs/Sono, Alimentação, Histórico de Saúde e Familiar) ainda não
              estão disponíveis nesta versão parcial.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Seções em modo Read-Only */}
      <div className="space-y-4 mb-8">
        {SECTIONS.map((sec) => {
          const isExpanded = !!expandedSections[sec.id]
          const data = anamnesis.sections?.[sec.id]

          return (
            <div
              key={sec.id}
              className="border rounded-lg bg-white overflow-hidden border-gray-200 shadow-sm"
            >
              <div
                onClick={() => toggleSection(sec.id)}
                className="p-4 flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{sec.label}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    Visualizar
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  {renderSectionSummary(sec.id, data)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between items-center bg-gray-50 p-6 rounded-lg border border-gray-200">
        <button
          onClick={() => navigate(`/patients/${patientId}`)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors"
        >
          Voltar ao Paciente
        </button>
        <button
          onClick={() => navigate(`/patients/${patientId}/anamneses`)}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Voltar à Lista
        </button>
      </div>
    </div>
  )
}
