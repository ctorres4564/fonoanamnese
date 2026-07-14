import { describe, it, expect } from 'vitest';
import { pregnancyHistorySchema, birthHistorySchema } from '../../schemas/anamnesis';

describe('Pregnancy, Birth and Neonatal Schemas', () => {
  describe('pregnancyHistorySchema', () => {
    it('should validate maternalAge limits', () => {
      const result1 = pregnancyHistorySchema.safeParse({ maternalAge: 8 });
      expect(result1.success).toBe(false);
      
      const result2 = pregnancyHistorySchema.safeParse({ maternalAge: 70 });
      expect(result2.success).toBe(false);
      
      const result3 = pregnancyHistorySchema.safeParse({ maternalAge: 30 });
      expect(result3.success).toBe(true);
    });

    it('should require description if complications is sim', () => {
      const result = pregnancyHistorySchema.safeParse({ pregnancyComplications: 'sim' });
      expect(result.success).toBe(false);
      
      const result2 = pregnancyHistorySchema.safeParse({ pregnancyComplications: 'sim', pregnancyComplicationsDescription: 'Hipertensão' });
      expect(result2.success).toBe(true);
    });
  });

  describe('birthHistorySchema', () => {
    it('should validate apgar limits', () => {
      const result1 = birthHistorySchema.safeParse({ apgar1: -1 });
      expect(result1.success).toBe(false);
      
      const result2 = birthHistorySchema.safeParse({ apgar5: 11 });
      expect(result2.success).toBe(false);
      
      const result3 = birthHistorySchema.safeParse({ apgar1: 8, apgar5: 9 });
      expect(result3.success).toBe(true);
    });
  });
});
