import type { ActualAnamnesisSection, AutosaveState } from '../../types/anamnesis';
import { SectionNavigation } from './SectionNavigation';
import { ProgressIndicator } from './ProgressIndicator';
import { AutosaveIndicator } from './AutosaveIndicator';

interface AnamnesisWizardProps {
  sections: { id: ActualAnamnesisSection | string; label: string }[];
  currentSection: ActualAnamnesisSection | string;
  completedSections: string[];
  completionPercentage: number;
  autosaveState: AutosaveState;
  lastSavedAt?: Date;
  onSelectSection: (section: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onManualSave: () => void;
  children: React.ReactNode;
}

export function AnamnesisWizard({
  sections,
  currentSection,
  completedSections,
  completionPercentage,
  autosaveState,
  lastSavedAt,
  onSelectSection,
  onNext,
  onPrevious,
  onManualSave,
  children
}: AnamnesisWizardProps) {
  const currentIndex = sections.findIndex(s => s.id === currentSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto w-full">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <SectionNavigation 
            sections={sections}
            currentSection={currentSection}
            completedSections={completedSections}
            onSelectSection={onSelectSection}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <ProgressIndicator percentage={completionPercentage} />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {sections[currentIndex]?.label}
          </h1>
          <AutosaveIndicator 
            state={autosaveState} 
            lastSavedAt={lastSavedAt} 
            onManualSave={onManualSave} 
          />
        </div>
        
        {/* Dynamic Section Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Wizard Controls */}
        <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className={`px-4 py-2 text-sm font-medium rounded-md border
              ${isFirst 
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            Anterior
          </button>

          <button
            onClick={onNext}
            className="px-4 py-2 text-sm font-medium rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLast ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </main>
    </div>
  );
}
