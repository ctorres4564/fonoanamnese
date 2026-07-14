import type { AnamnesisSection } from '../../types/anamnesis';

interface SectionNavigationProps {
  sections: { id: AnamnesisSection; label: string }[];
  currentSection: AnamnesisSection;
  completedSections: AnamnesisSection[];
  onSelectSection: (section: AnamnesisSection) => void;
}

export function SectionNavigation({
  sections,
  currentSection,
  completedSections,
  onSelectSection
}: SectionNavigationProps) {
  return (
    <nav className="flex flex-col space-y-1">
      {sections.map((section) => {
        const isCurrent = section.id === currentSection;
        const isCompleted = completedSections.includes(section.id);

        return (
          <button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className={`
              text-left px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${isCurrent ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{section.label}</span>
              {isCompleted && !isCurrent && (
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
