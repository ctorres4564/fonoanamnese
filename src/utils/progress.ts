import type { ActualAnamnesisSection } from '../types/anamnesis';

export function calculateAnamnesisProgress(
  currentCompleted: ActualAnamnesisSection[],
  sectionId: ActualAnamnesisSection,
  isValid: boolean,
  totalSectionsCount: number
): { newCompleted: ActualAnamnesisSection[], completionPercentage: number } {
  let newCompleted = [...currentCompleted];
  
  if (isValid) {
    if (!newCompleted.includes(sectionId)) {
      newCompleted.push(sectionId);
    }
  } else {
    newCompleted = newCompleted.filter(s => s !== sectionId);
  }

  // Ensure percentage stays between 0 and 100, even if totalSectionsCount is 0 or newCompleted > totalSectionsCount (should not happen)
  if (totalSectionsCount === 0) return { newCompleted, completionPercentage: 0 };
  
  let percentage = Math.round((newCompleted.length / totalSectionsCount) * 100);
  percentage = Math.max(0, Math.min(100, percentage));

  return {
    newCompleted,
    completionPercentage: percentage
  };
}
