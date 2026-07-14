import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnamnesisById, updateAnamnesis } from '../../services/anamnesisService';
import type { Anamnesis, ActualAnamnesisSection, AutosaveState } from '../../types/anamnesis';
import { useAuth } from '../../contexts/AuthContext';
import { AnamnesisWizard } from '../../components/anamnesis/AnamnesisWizard';
import { SectionContainer } from '../../components/anamnesis/SectionContainer';

// Importando as seções criadas
import { InterviewDataSection } from '../../components/anamnesis/InterviewDataSection';
import { ChiefComplaintSection } from '../../components/anamnesis/ChiefComplaintSection';
import { PregnancyBirthNeonatalSection } from '../../components/anamnesis/PregnancyBirthNeonatalSection';
import { calculateAnamnesisProgress } from '../../utils/progress';

const SECTIONS: { id: ActualAnamnesisSection; label: string }[] = [
  { id: 'interviewData', label: 'Dados da Entrevista' },
  { id: 'chiefComplaint', label: 'Queixa Principal' },
  { id: 'pregnancyBirthNeonatal', label: 'Gestação, Parto e Neonatal' },
  // Os demais continuam como placeholders temporários por enquanto, mas não acessíveis nesta fase (a pedido).
  // Porém a navegação precisa aceitá-los no tipo.
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
          {!['interviewData', 'chiefComplaint', 'pregnancyBirthNeonatal'].includes(anamnesis.currentSection) && (
            <p className="text-gray-500">Formulário clínico (placeholder) para a seção: {anamnesis.currentSection}</p>
          )}
        </SectionContainer>
      </AnamnesisWizard>
    </div>
  );
}
