import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getPatientById } from '../../services/patientService'
import { listGuardiansByPatient } from '../../services/guardianService'
import {
  listAnamnesesByPatient,
  createAnamnesis,
  getLatestActiveAnamnesisByPatient,
} from '../../services/anamnesisService'
import { GuardianForm } from './GuardianForm'
import { calculateAge } from '../../utils/age'
import type { Patient, Guardian } from '../../types'
import type { Anamnesis as AnamnesisType } from '../../domains/anamnesis'

export const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [patient, setPatient] = useState<Patient | null>(null)
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [anamneses, setAnamneses] = useState<AnamnesisType[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showGuardianForm, setShowGuardianForm] = useState(false)
  const [isCreatingAnamnesis, setIsCreatingAnamnesis] = useState(false)

  const fetchData = useCallback(async () => {
    if (!user || !id) return
    try {
      setLoading(true)
      setError(null)

      const patientData = await getPatientById(id)

      // Security check
      if (patientData && patientData.professionalId !== user.id) {
        setError('Você não tem permissão para acessar este paciente.')
        setPatient(null)
        return
      }

      setPatient(patientData)

      const [guardiansData, anamnesesData] = await Promise.all([
        listGuardiansByPatient(user.id, id),
        listAnamnesesByPatient(id, user.id, true),
      ])

      setGuardians(guardiansData)
      setAnamneses(anamnesesData)
    } catch (err) {
      console.error(err)
      setError('Erro ao carregar dados do paciente.')
    } finally {
      setLoading(false)
    }
  }, [user, id])

  useEffect(() => {
    fetchData()
  }, [user, id, fetchData])

  const handleNewAnamnesis = async () => {
    if (!user || !patient) return

    try {
      setIsCreatingAnamnesis(true)
      const latestActive = await getLatestActiveAnamnesisByPatient(patient.id!, user.id)

      if (latestActive) {
        const confirmMsg = `Este paciente já possui uma anamnese em andamento (status: ${latestActive.status}).\n\nDeseja criar uma nova mesmo assim? (Clique em Cancelar para abortar)`
        if (!window.confirm(confirmMsg)) {
          return
        }
      } else {
        if (!window.confirm('Deseja iniciar uma nova anamnese para este paciente?')) {
          return
        }
      }

      const newAnamnesis = await createAnamnesis(patient.id!, user.id)
      navigate(`/patients/${patient.id}/anamneses/${newAnamnesis.id}/edit`)
    } catch (err) {
      console.error(err)
      alert('Erro ao criar anamnese.')
    } finally {
      setIsCreatingAnamnesis(false)
    }
  }

  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'Rascunho',
      in_progress: 'Em Andamento',
      review: 'Em Revisão',
      finalized: 'Finalizada',
      corrected: 'Corrigida',
      archived: 'Arquivada',
    }
    return statusMap[status] || status
  }

  const getActionForStatus = (anamnesis: AnamnesisType) => {
    if (anamnesis.isArchived) {
      return {
        label: 'Visualizar',
        action: () => navigate(`/patients/${patient?.id}/anamneses/${anamnesis.id}/view`),
      }
    }
    switch (anamnesis.status) {
      case 'draft':
      case 'in_progress':
        return {
          label: 'Continuar',
          action: () => navigate(`/patients/${patient?.id}/anamneses/${anamnesis.id}/edit`),
        }
      case 'review':
        return {
          label: 'Revisar',
          action: () => navigate(`/patients/${patient?.id}/anamneses/${anamnesis.id}/review`),
        }
      default:
        return {
          label: 'Visualizar',
          action: () => navigate(`/patients/${patient?.id}/anamneses/${anamnesis.id}/view`),
        }
    }
  }

  if (loading) return <div className="p-4 text-center">Carregando detalhes...</div>
  if (error) return <div className="p-4 text-red-600 text-center">{error}</div>
  if (!patient) return <div className="p-4 text-center">Paciente não encontrado.</div>

  const totalAnamneses = anamneses.length
  const draftCount = anamneses.filter((a) => a.status === 'draft').length
  const inProgressCount = anamneses.filter((a) => a.status === 'in_progress').length
  const finalizedCount = anamneses.filter((a) => a.status === 'finalized').length
  const recentAnamneses = anamneses.slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/patients" className="text-indigo-600 hover:underline mb-2 block">
            &larr; Voltar para Pacientes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{patient.fullName}</h1>
          <p className="text-sm text-gray-500">
            Prontuário: {patient.recordNumber} | Status: {patient.status}
          </p>
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Informações Básicas</h3>
          <button
            onClick={() => navigate(`/patients/${patient.id}/edit`)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Editar Paciente
          </button>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Data de Nascimento</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(patient.birthDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} (
                {calculateAge(patient.birthDate)} anos)
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Seção de Anamneses */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Anamneses</h3>
          <div className="flex gap-4 items-center">
            <Link
              to={`/patients/${patient.id}/anamneses`}
              className="text-sm text-indigo-600 hover:underline"
            >
              Ver todas ({totalAnamneses})
            </Link>
            <button
              onClick={handleNewAnamnesis}
              disabled={isCreatingAnamnesis}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
            >
              {isCreatingAnamnesis ? 'Criando...' : '+ Nova Anamnese'}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-2xl font-bold text-gray-700">{totalAnamneses}</span>
            <span className="text-xs text-gray-500 uppercase">Total</span>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <span className="block text-2xl font-bold text-yellow-700">{draftCount}</span>
            <span className="text-xs text-yellow-600 uppercase">Rascunhos</span>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <span className="block text-2xl font-bold text-blue-700">{inProgressCount}</span>
            <span className="text-xs text-blue-600 uppercase">Em Andamento</span>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <span className="block text-2xl font-bold text-green-700">{finalizedCount}</span>
            <span className="text-xs text-green-600 uppercase">Finalizadas</span>
          </div>
        </div>

        {recentAnamneses.length > 0 && (
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentAnamneses.map((anamnesis) => {
                const action = getActionForStatus(anamnesis)
                const updatedDate = anamnesis.updatedAt
                  ? new Date(
                      (anamnesis.updatedAt as any).seconds
                        ? (anamnesis.updatedAt as any).seconds * 1000
                        : anamnesis.updatedAt,
                    ).toLocaleDateString('pt-BR')
                  : 'N/A'

                return (
                  <li key={anamnesis.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          V{anamnesis.version} - Seção Atual: {anamnesis.currentSection}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500 gap-4">
                          <span>Atualizada em {updatedDate}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {translateStatus(anamnesis.status)}{' '}
                            {anamnesis.isArchived ? '(Arquivada)' : ''}
                          </span>
                          <span>{anamnesis.completionPercentage}% concluída</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={action.action}
                          className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                        >
                          {action.label} &rarr;
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Responsáveis */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Responsáveis</h2>
        {!showGuardianForm && (
          <button
            onClick={() => setShowGuardianForm(true)}
            className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition text-sm"
          >
            + Adicionar Responsável
          </button>
        )}
      </div>

      {showGuardianForm && (
        <GuardianForm
          patientId={patient.id!}
          onSuccess={() => {
            setShowGuardianForm(false)
            fetchData()
          }}
          onCancel={() => setShowGuardianForm(false)}
        />
      )}

      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {guardians.length === 0 ? (
          <p className="text-gray-500 text-sm italic col-span-2">Nenhum responsável cadastrado.</p>
        ) : (
          guardians.map((guardian) => (
            <div
              key={guardian.id}
              className="bg-white p-4 shadow rounded-md border border-gray-200"
            >
              <h4 className="font-semibold text-gray-900">{guardian.fullName}</h4>
              <p className="text-sm text-gray-600">{guardian.relationship}</p>
              <p className="text-sm text-gray-600">Tel: {guardian.phone}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {guardian.isPrimaryContact && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Principal
                  </span>
                )}
                {guardian.isLegalGuardian && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Legal
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
