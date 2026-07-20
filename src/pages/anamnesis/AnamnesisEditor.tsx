import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnamnesisById, updateAnamnesis } from '../../services/anamnesisService'
import {
  ACTIVE_ANAMNESIS_SECTIONS,
  ACTIVE_ANAMNESIS_SECTION_IDS,
  isActiveAnamnesisSection,
  type Anamnesis,
  type ActualAnamnesisSection,
  type AutosaveState,
} from '../../domains/anamnesis'
import { useAuth } from '../../contexts/AuthContext'
import { AnamnesisWizard } from '../../domains/anamnesis/shared/components/AnamnesisWizard'
import { SectionContainer } from '../../domains/anamnesis/shared/components/SectionContainer'

// Importando as seções criadas
import { InterviewDataSection } from '../../domains/anamnesis/interview/components/InterviewDataSection'
import { ChiefComplaintSection } from '../../domains/anamnesis/chiefComplaint/components/ChiefComplaintSection'
import { PregnancyBirthNeonatalSection } from '../../domains/anamnesis/pregnancy/components/PregnancyBirthNeonatalSection'
import { MotorDevelopmentSection } from '../../domains/anamnesis/motor/components/MotorDevelopmentSection'
import { CommunicationDevelopmentSection } from '../../domains/anamnesis/communication/components/CommunicationDevelopmentSection'
import { HealthHistorySection } from '../../domains/anamnesis/health/components/HealthHistorySection'
import { FamilyHistorySection } from '../../domains/anamnesis/family/components/FamilyHistorySection'
import { ChildRoutineSection } from '../../domains/anamnesis/routine/components/ChildRoutineSection'
import { calculateAnamnesisProgress } from '../../utils/progress'
import { validateSection } from '../../utils/validation'

const SECTIONS = ACTIVE_ANAMNESIS_SECTIONS

export default function AnamnesisEditor() {
  const { patientId, anamnesisId } = useParams<{ patientId: string; anamnesisId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [anamnesis, setAnamnesis] = useState<Anamnesis | null>(null)
  const [autosaveState, setAutosaveState] = useState<AutosaveState>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<Date | undefined>()
  const [currentSectionValid, setCurrentSectionValid] = useState(false)

  // Armazena temporariamente os dados editados antes de salvar
  const currentDataRef = useRef<any>(null)
  const currentSectionValidRef = useRef<boolean>(false)

  useEffect(() => {
    if (anamnesisId) {
      getAnamnesisById(anamnesisId).then((data) => {
        if (data) {
          // Se a seção atual for uma das velhas, atualiza para a primeira real
          if (!isActiveAnamnesisSection(data.currentSection)) {
            data.currentSection = 'interviewData'
          }
          const completedSections = ACTIVE_ANAMNESIS_SECTION_IDS.filter(
            (sectionId) => validateSection(sectionId, data.sections?.[sectionId]).isValid,
          )
          data.completedSections = completedSections
          data.completionPercentage = Math.round(
            (completedSections.length / ACTIVE_ANAMNESIS_SECTION_IDS.length) * 100,
          )
          setAnamnesis(data)
        }
      })
    }
  }, [anamnesisId])

  const handleSectionDataChange = useCallback((data: any, isValid: boolean) => {
    currentDataRef.current = data
    currentSectionValidRef.current = isValid
    setCurrentSectionValid(isValid)
  }, [])

  const saveCurrentSection = async (navigatingTo?: ActualAnamnesisSection) => {
    if (!user || !anamnesisId || !anamnesis) return false

    setAutosaveState('saving')
    try {
      const sectionId = anamnesis.currentSection

      // Merge new data into sections
      const updatedSections = {
        ...anamnesis.sections,
        [sectionId]: currentDataRef.current,
      }

      // Calculate new completedSections and percentage
      const { newCompleted, completionPercentage } = calculateAnamnesisProgress(
        anamnesis.completedSections,
        sectionId,
        currentSectionValidRef.current,
        ACTIVE_ANAMNESIS_SECTION_IDS,
      )

      const nextSection = navigatingTo || anamnesis.currentSection

      await updateAnamnesis(
        anamnesisId,
        {
          currentSection: nextSection,
          completedSections: newCompleted,
          completionPercentage,
          sections: updatedSections,
        },
        user.id,
      )

      setAnamnesis((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          currentSection: nextSection,
          completedSections: newCompleted,
          completionPercentage,
          sections: updatedSections,
        }
      })

      setAutosaveState('saved')
      setLastSavedAt(new Date())
      return true
    } catch {
      setAutosaveState('error')
      return false
    }
  }

  const handleSelectSection = async (section: ActualAnamnesisSection) => {
    if (anamnesis?.currentSection === section) return
    await saveCurrentSection(section)
  }

  const currentIndex = SECTIONS.findIndex((s) => s.id === anamnesis?.currentSection)

  const handleNext = async () => {
    if (currentIndex < SECTIONS.length - 1) {
      await saveCurrentSection(SECTIONS[currentIndex + 1].id)
    } else {
      await saveCurrentSection()
      navigate(`/patients/${patientId}/anamneses/${anamnesisId}/review`)
    }
  }

  const handlePrevious = async () => {
    if (currentIndex > 0) {
      await saveCurrentSection(SECTIONS[currentIndex - 1].id)
    }
  }

  const handleManualSave = async () => {
    await saveCurrentSection()
  }

  const handleSaveAndExit = async () => {
    await saveCurrentSection()
    navigate(`/patients/${patientId}/anamneses`)
  }

  const handleBackToPatient = async () => {
    await saveCurrentSection()
    navigate(`/patients/${patientId}`)
  }

  if (!anamnesis) return <div className="p-4 text-center">Carregando editor...</div>

  const liveProgress = calculateAnamnesisProgress(
    anamnesis.completedSections,
    anamnesis.currentSection,
    currentSectionValid,
    ACTIVE_ANAMNESIS_SECTION_IDS,
  )

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      {/* Header Actions */}
      <div className="max-w-7xl mx-auto w-full mb-6 flex justify-between items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-55">Editor de Anamnese</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Versão: {anamnesis.version} | Status: {anamnesis.status}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleBackToPatient}
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
          >
            Voltar ao Paciente
          </button>
          <button
            onClick={handleSaveAndExit}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-750 px-3 py-1.5 rounded transition"
          >
            Salvar e Sair
          </button>
        </div>
      </div>

      <AnamnesisWizard
        sections={SECTIONS}
        currentSection={anamnesis.currentSection}
        completedSections={liveProgress.newCompleted}
        completionPercentage={liveProgress.completionPercentage}
        autosaveState={autosaveState}
        lastSavedAt={lastSavedAt}
        onSelectSection={handleSelectSection}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onManualSave={handleManualSave}
      >
        <SectionContainer
          title={SECTIONS.find((s) => s.id === anamnesis.currentSection)?.label || 'Seção'}
          description="Preencha os dados abaixo."
        >
          {anamnesis.currentSection === 'interviewData' && (
            <InterviewDataSection
              initialData={anamnesis.sections?.interviewData}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'chiefComplaint' && (
            <ChiefComplaintSection
              initialData={anamnesis.sections?.chiefComplaint}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'pregnancyBirthNeonatal' && (
            <PregnancyBirthNeonatalSection
              initialData={anamnesis.sections?.pregnancyBirthNeonatal}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'motorDevelopment' && (
            <MotorDevelopmentSection
              initialData={anamnesis.sections?.motorDevelopment}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'communicationDevelopment' && (
            <CommunicationDevelopmentSection
              initialData={anamnesis.sections?.communicationDevelopment}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'healthHistory' && (
            <HealthHistorySection
              initialData={anamnesis.sections?.healthHistory}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'familyHistory' && (
            <FamilyHistorySection
              initialData={anamnesis.sections?.familyHistory}
              onChange={handleSectionDataChange}
            />
          )}
          {anamnesis.currentSection === 'childRoutine' && (
            <ChildRoutineSection
              initialData={anamnesis.sections?.childRoutine}
              onChange={handleSectionDataChange}
            />
          )}
        </SectionContainer>
      </AnamnesisWizard>
    </div>
  )
}
