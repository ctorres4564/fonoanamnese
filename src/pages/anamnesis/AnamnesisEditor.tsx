import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnamnesisById, updateAnamnesis } from '../../services/anamnesisService';
import type { Anamnesis, AnamnesisSection, AutosaveState } from '../../types/anamnesis';
import { useAuth } from '../../contexts/AuthContext';
import { AnamnesisWizard } from '../../components/anamnesis/AnamnesisWizard';
import { SectionContainer } from '../../components/anamnesis/SectionContainer';

const SECTIONS: { id: AnamnesisSection; label: string }[] = [
  { id: 'identification', label: 'Identificação' },
  { id: 'clinical_history', label: 'Histórico Clínico' },
  { id: 'development', label: 'Desenvolvimento' },
  { id: 'social_history', label: 'Histórico Social' },
  { id: 'other', label: 'Outros' },
];

export default function AnamnesisEditor() {
  const { id, anamnesisId } = useParams<{ id: string; anamnesisId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [anamnesis, setAnamnesis] = useState<Anamnesis | null>(null);
  const [autosaveState, setAutosaveState] = useState<AutosaveState>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | undefined>();

  useEffect(() => {
    if (anamnesisId) {
      getAnamnesisById(anamnesisId).then(data => {
        if (data) setAnamnesis(data);
      });
    }
  }, [anamnesisId]);

  if (!anamnesis) return <div>Carregando editor...</div>;

  const handleSelectSection = (section: AnamnesisSection) => {
    setAnamnesis({ ...anamnesis, currentSection: section });
  };

  const currentIndex = SECTIONS.findIndex(s => s.id === anamnesis.currentSection);

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      handleSelectSection(SECTIONS[currentIndex + 1].id);
    } else {
      navigate(`/patients/${id}/anamnesis/${anamnesisId}/review`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleSelectSection(SECTIONS[currentIndex - 1].id);
    }
  };

  const handleManualSave = async () => {
    if (!user || !anamnesisId) return;
    setAutosaveState('saving');
    try {
      await updateAnamnesis(anamnesisId, {
        currentSection: anamnesis.currentSection,
        completedSections: anamnesis.completedSections,
        completionPercentage: anamnesis.completionPercentage,
        sections: anamnesis.sections,
      }, user.id);
      setAutosaveState('saved');
      setLastSavedAt(new Date());
    } catch {
      setAutosaveState('error');
    }
  };

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
        <SectionContainer title={SECTIONS[currentIndex]?.label || 'Seção'} description="Preencha os dados desta seção.">
          <p className="text-gray-500">Formulário clínico (placeholder) para a seção: {anamnesis.currentSection}</p>
        </SectionContainer>
      </AnamnesisWizard>
    </div>
  );
}
