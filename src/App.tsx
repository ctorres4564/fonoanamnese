import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ProfessionalProfile from './pages/profile/ProfessionalProfile'
import { logoutUser } from './services/auth'
import { PatientList } from './pages/patients/PatientList'
import { PatientForm } from './pages/patients/PatientForm'
import { PatientDetails } from './pages/patients/PatientDetails'
import AnamnesisList from './pages/anamnesis/AnamnesisList'
import AnamnesisEditor from './pages/anamnesis/AnamnesisEditor'
import AnamnesisReview from './pages/anamnesis/AnamnesisReview'
import AnamnesisView from './pages/anamnesis/AnamnesisView'

// Servicos de Dados
import { listPatientsByProfessional } from './services/patientService'
import { listAnamnesesByProfessional } from './services/anamnesisService'
import type { Patient, Anamnesis } from './types'

// Icones do Dashboard
import {
  Users,
  FileText,
  AlertCircle,
  FileCheck,
  UserPlus,
  User,
  LogOut,
  ArrowRight,
  Clock,
  Activity,
} from 'lucide-react'

// Dashboard Clínico do Fonoaudiólogo
const Dashboard = () => {
  const { user, profile } = useAuth()
  const [patients, setPatients] = useState<Patient[]>([])
  const [anamneses, setAnamneses] = useState<Anamnesis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.id) return
      try {
        setLoading(true)
        setError(null)
        const [patientsData, anamnesesData] = await Promise.all([
          listPatientsByProfessional(user.id),
          listAnamnesesByProfessional(user.id),
        ])
        setPatients(patientsData)
        setAnamneses(anamnesesData)
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err)
        setError('Ocorreu um erro ao carregar os dados do painel.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [user])

  const handleLogout = async () => {
    await logoutUser()
  }

  // Calculos de metricas
  const activePatientsCount = patients.filter((p) => !p.isArchived).length
  const draftAnamnesesCount = anamneses.filter(
    (a) => a.status === 'draft' || a.status === 'in_progress',
  ).length
  const reviewAnamnesesCount = anamneses.filter((a) => a.status === 'review').length
  const finalizedAnamnesesCount = anamneses.filter((a) => a.status === 'finalized').length
  const alertsCount = anamneses.filter((a) => (a as any).alerts && (a as any).alerts.length > 0).length

  // Obter pacientes recentes (ordenados por data de criacao descendente)
  const recentPatients = [...patients]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">Carregando painel clínico...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header de Boas-vindas */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
              Olá, {profile?.professionalName || user?.email}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
              CREFONO:{' '}
              {profile?.crefonoNumber
                ? `${profile.crefonoNumber} - ${profile.crefonoState || ''}`
                : 'Não cadastrado'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/profile/setup"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              title="Meu Perfil"
            >
              <User className="h-6 w-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        {/* Alerta de Perfil Incompleto */}
        {!profile?.crefonoNumber && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-300 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Perfil Profissional Incompleto</p>
              <p className="text-xs mt-0.5">
                Para conseguir finalizar e emitir documentos de anamnese em PDF, você precisa
                preencher o número de registro do seu CREFONO.
                <Link
                  to="/profile/setup"
                  className="underline ml-1 font-medium hover:text-amber-900 dark:hover:text-amber-200"
                >
                  Completar perfil agora
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Grade de Metricas */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Pacientes
              </span>
              <div className="p-2 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {activePatientsCount}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">ativos no sistema</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Rascunhos
              </span>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {draftAnamnesesCount}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">em preenchimento</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Revisão
              </span>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {reviewAnamnesesCount}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">
                pendente de confirmacao
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-between min-h-[120px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Finalizadas
              </span>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {finalizedAnamnesesCount}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">documentadas em PDF</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors flex flex-col justify-between min-h-[120px] col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Alertas
              </span>
              <div className="p-2 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {alertsCount}
              </span>
              <p className="text-xs text-gray-400 dark:text-gray-550 mt-1">sinais de atencao</p>
            </div>
          </div>
        </div>

        {/* Secao Principal: Atalhos & Recentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Menu de Acoes Rapidas */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-600" />
              Ações Rápidas
            </h2>
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/patients/new"
                className="flex items-center justify-between p-3 bg-teal-50/50 hover:bg-teal-50 dark:bg-teal-950/20 dark:hover:bg-teal-950/30 text-teal-750 dark:text-teal-300 rounded-xl transition-all group font-medium"
              >
                <div className="flex items-center gap-3">
                  <UserPlus className="h-5 w-5" />
                  <span>Cadastrar Paciente</span>
                </div>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/patients"
                className="flex items-center justify-between p-3 bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 rounded-xl transition-all group font-medium"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <span>Ver Meus Pacientes</span>
                </div>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/profile/setup"
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl transition-all group font-medium"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  <span>Configurações do Perfil</span>
                </div>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Pacientes Cadastrados Recentemente */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors md:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                Pacientes Recentes
              </span>
              <Link to="/patients" className="text-xs font-semibold text-teal-600 hover:underline">
                Ver todos
              </Link>
            </h2>

            <div className="mt-4">
              {recentPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                  <UserPlus className="h-8 w-8 mx-auto text-gray-300 dark:text-gray-700 mb-2" />
                  <p className="text-sm">Nenhum paciente cadastrado ainda.</p>
                  <Link
                    to="/patients/new"
                    className="text-xs text-teal-600 hover:underline font-semibold mt-1 inline-block"
                  >
                    Cadastrar o primeiro paciente
                  </Link>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                  <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-850 text-xs font-semibold text-gray-450 dark:text-gray-500 uppercase tracking-wider text-left">
                      <tr>
                        <th className="px-4 py-3">Nome</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Prontuário</th>
                        <th className="px-4 py-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                      {recentPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                        >
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                            {patient.fullName}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                patient.status === 'therapy'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                                  : patient.status === 'evaluation'
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300'
                                    : patient.status === 'follow_up'
                                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300'
                                      : 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                              }`}
                            >
                              {patient.status === 'therapy'
                                ? 'Terapia'
                                : patient.status === 'evaluation'
                                  ? 'Avaliação'
                                  : patient.status === 'follow_up'
                                    ? 'Acompanhamento'
                                    : patient.status === 'discharged'
                                      ? 'Alta'
                                      : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                            {patient.recordNumber}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              to={`/patients/${patient.id}`}
                              className="text-xs font-semibold text-teal-650 hover:text-teal-700 dark:hover:text-teal-350"
                            >
                              Ver Prontuário
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/profile/setup"
            element={
              <ProtectedRoute>
                <ProfessionalProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/new"
            element={
              <ProtectedRoute>
                <PatientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients/:patientId/anamneses"
            element={
              <ProtectedRoute>
                <AnamnesisList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:patientId/anamneses/:anamnesisId/edit"
            element={
              <ProtectedRoute>
                <AnamnesisEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:patientId/anamneses/:anamnesisId/review"
            element={
              <ProtectedRoute>
                <AnamnesisReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:patientId/anamneses/:anamnesisId/view"
            element={
              <ProtectedRoute>
                <AnamnesisView />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
