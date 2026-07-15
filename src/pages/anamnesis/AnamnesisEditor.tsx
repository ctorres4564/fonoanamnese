import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnamnesisById, updateAnamnesis } from '../../services/anamnesisService';
import type { Anamnesis, ActualAnamnesisSection, AutosaveState } from '../../domains/anamnesis';
import { useAuth } from '../../contexts/AuthContext';
import { AnamnesisWizard } from '../../domains/anamnesis/shared/components/AnamnesisWizard';
import { SectionContainer } from '../../domains/anamnesis/shared/components/SectionContainer';

// Importando as seções criadas
import { InterviewDataSection } from '../../domains/anamnesis/interview/components/InterviewDataSection';
import { ChiefComplaintSection } from '../../domains/anamnesis/chiefComplaint/components/ChiefComplaintSection';
import { PregnancyBirthNeonatalSection } from '../../domains/anamnesis/pregnancy/components/PregnancyBirthNeonatalSection';
import { MotorDevelopmentSection } from '../../domains/anamnesis/motor/components/MotorDevelopmentSection';
import { CommunicationDevelopmentSection } from '../../domains/anamnesis/communication/components/CommunicationDevelopmentSection';
import { LanguageDevelopmentSection } from '../../domains/anamnesis/language/components/LanguageDevelopmentSection';
import { calculateAnamnesisProgress } from '../../utils/progress';

const SECTIONS: { id: ActualAnamnesisSection; label: string }[] = [
  { id: 'interviewData', label: 'Dados da Entrevista' },
  { id: 'chiefComplaint', label: 'Queixa Principal' },
  { id: 'pregnancyBirthNeonatal', label: 'Gestação, Parto e Neonatal' },
  { id: 'motorDevelopment', label: 'Desenvolvimento Motor' },
  { id: 'communicationDevelopment', label: 'Comunicação Inicial' },
  { id: 'languageDevelopment', label: 'Linguagem Receptiva e Expressiva' },
];

export default function AnamnesisEditor() {
  const { id, anamnesisId } = useParams<{ id: string; anamnesisId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [anamnesis, setAnamnesis] = useState<Anamnesis | null>(null);
  const [autosaveState, setAutosaveState] = useState<AutosaveState>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | undefined>();

  // Armazena temporariamente os dados editados antes de salvar
  const currentDataRef = useRef<any>(null);
  const currentSectionValidRef = useRef<boolean>(false);

  useEffect(() => {
    if (anamnesisId) {
      getAnamnesisById(anamnesisId).then(data => {
        if (data) {
          // Se a seção atual for uma das velhas, atualiza para a primeira real
          if (data.currentSection === 'identification' as any) {
            data.currentSection = 'interviewData';
          }
          setAnamnesis(data);
        }
      });
    }
  }, [anamnesisId]);

  const handleSectionDataChange = useCallback((data: any, isValid: boolean) => {
    currentDataRef.current = data;
    currentSectionValidRef.current = isValid;
  }, []);

  const saveCurrentSection = async (navigatingTo?: ActualAnamnesisSection) => {
    if (!user || !anamnesisId || !anamnesis) return false;
    
    setAutosaveState('saving');
    try {
      const sectionId = anamnesis.currentSection;
      
      // Merge new data into sections
      const updatedSections = {
        ...anamnesis.sections,
        [sectionId]: currentDataRef.current
      };

      // Calculate new completedSections and percentage
      const { newCompleted, completionPercentage } = calculateAnamnesisProgress(
        anamnesis.completedSections,
        sectionId,
        currentSectionValidRef.current,
        SECTIONS.length
      );

      const nextSection = navigatingTo || anamnesis.currentSection;

      await updateAnamnesis(anamnesisId, {
        currentSection: nextSection,
        completedSections: newCompleted,
        completionPercentage,
        sections: updatedSections,
      }, user.id);

      setAnamnesis(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          currentSection: nextSection,
          completedSections: newCompleted,
          completionPercentage,
          sections: updatedSections
        };
      });

      setAutosaveState('saved');
      setLastSavedAt(new Date());
      return true;
    } catch {
      setAutosaveState('error');
      return false;
    }
  };

  const handleSelectSection = async (section: ActualAnamnesisSection) => {
    if (anamnesis?.currentSection === section) return;
    await saveCurrentSection(section);
  };

  const currentIndex = SECTIONS.findIndex(s => s.id === anamnesis?.currentSection);

  const handleNext = async () => {
    if (currentIndex < SECTIONS.length - 1) {
      await saveCurrentSection(SECTIONS[currentIndex + 1].id);
    } else {
      await saveCurrentSection();
      navigate(`/patients/${id}/anamnesis/${anamnesisId}/review`);
    }
  };

  const handlePrevious = async () => {
    if (currentIndex > 0) {
      await saveCurrentSection(SECTIONS[currentIndex - 1].id);
    }
  };

  const handleManualSave = async () => {
    await saveCurrentSection();
  };

  if (!anamnesis) return <div>Carregando editor...</div>;

  return (
    <div className="py-6 sm:px-6 lg:px-8">
      <AnamnesisWizard
        sections={SECTIONS}
        currentSection={anamnesis.currentSection}
        completedSections={anamnesis.completedSections}
        completionPercentage={anamnesis.completionPercentage}
        autosaveState={autosaveState}
        lastSavedAt={lastSavedAt}
        onSelectSection={handleSelectSection}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onManualSave={handleManualSave}
      >
        <SectionContainer 
          title={SECTIONS.find(s => s.id === anamnesis.currentSection)?.label || 'Seção'} 
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
          {anamnesis.currentSection === 'languageDevelopment' && (
            <LanguageDevelopmentSection 
              initialData={anamnesis.sections?.languageDevelopment} 
              onChange={handleSectionDataChange} 
            />
          )}
        </SectionContainer>
      </AnamnesisWizard>
    </div>
  );
}
