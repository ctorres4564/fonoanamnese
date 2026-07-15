import type { ZodSchema } from 'zod';
import type { ActualAnamnesisSection } from '../domains/anamnesis';
import { interviewDataSchema } from '../domains/anamnesis/interview/schema';
import { chiefComplaintSchema } from '../domains/anamnesis/chiefComplaint/schema';
import { pregnancyBirthNeonatalSchema } from '../domains/anamnesis/pregnancy/schema';
import { motorDevelopmentSchema } from '../domains/anamnesis/motor/schema';
import { communicationDevelopmentSchema } from '../domains/anamnesis/communication/schema';
import { languageDevelopmentSchema } from '../domains/anamnesis/language/schema';
import { speechDevelopmentSchema } from '../domains/anamnesis/speech/schema';

// Map of all section schemas
export const SECTION_SCHEMAS: Partial<Record<ActualAnamnesisSection, ZodSchema>> = {
  interviewData: interviewDataSchema,
  chiefComplaint: chiefComplaintSchema,
  pregnancyBirthNeonatal: pregnancyBirthNeonatalSchema,
  motorDevelopment: motorDevelopmentSchema,
  communicationDevelopment: communicationDevelopmentSchema,
  languageDevelopment: languageDevelopmentSchema,
  speechDevelopment: speechDevelopmentSchema,
};

export interface SectionValidationResult {
  isValid: boolean;
  errors: string[];
  filledFieldsCount: number;
}

export function validateSection(
  sectionId: ActualAnamnesisSection,
  data: any
): SectionValidationResult {
  if (!data) {
    return {
      isValid: false,
      errors: ['Nenhum dado preenchido'],
      filledFieldsCount: 0,
    };
  }

  const schema = SECTION_SCHEMAS[sectionId as keyof typeof SECTION_SCHEMAS];
  if (!schema) {
    return {
      isValid: false,
      errors: ['Schema não encontrado para esta seção'],
      filledFieldsCount: 0,
    };
  }

  // Calculate filled fields count (shallow count of non-empty values)
  let filledFieldsCount = 0;
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      const val = data[key];
      if (val !== undefined && val !== null && val !== '') {
        if (Array.isArray(val)) {
          if (val.length > 0) filledFieldsCount++;
        } else {
          filledFieldsCount++;
        }
      }
    });
  }

  const result = schema.safeParse(data);

  if (result.success) {
    return {
      isValid: true,
      errors: [],
      filledFieldsCount,
    };
  }

  // Extract unique messages
  const errorMessages = Array.from(new Set((result.error as any).issues.map((err: any) => {
    // Se tivermos mensagens customizadas configuradas no schema
    if (err.message && err.message !== 'Required') {
      return err.message;
    }
    
    const fieldName = err.path.join('.');
    return `Campo obrigatório não preenchido: ${fieldName}`;
  }))) as string[];

  return {
    isValid: false,
    errors: errorMessages,
    filledFieldsCount,
  };
}
