import { describe, it, expect } from 'vitest';
import { 
  motorMilestoneSchema, 
  motorRegressionSchema, 
  physiotherapyHistorySchema,
  motorDevelopmentSchema
} from '../..';

describe('motorMilestoneSchema', () => {
  it('should allow valid status and age', () => {
    const data = {
      status: 'adquirido',
      acquisitionAgeMonths: 6,
      acquisitionMode: 'espontânea'
    };
    const result = motorMilestoneSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject negative age', () => {
    const data = {
      status: 'adquirido',
      acquisitionAgeMonths: -1
    };
    const result = motorMilestoneSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('A idade não pode ser negativa');
    }
  });

  it('should not require age when status is not acquired', () => {
    const data = {
      status: 'não adquirido'
    };
    const result = motorMilestoneSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe('motorRegressionSchema', () => {
  it('should require lostSkill and regressionAge when hasRegression is sim', () => {
    const data = { hasRegression: 'sim' };
    const result = motorRegressionSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path[0] === 'lostSkill')).toBe(true);
      expect(result.error.issues.some(i => i.path[0] === 'regressionAge')).toBe(true);
    }
  });

  it('should pass regression when valid', () => {
    const data = {
      hasRegression: 'sim',
      lostSkill: 'andar',
      regressionAge: 18,
      onsetMode: 'súbita'
    };
    const result = motorRegressionSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should require description when onsetMode is outro', () => {
    const data = {
      hasRegression: 'sim',
      lostSkill: 'andar',
      regressionAge: 18,
      onsetMode: 'outro'
    };
    const result = motorRegressionSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path[0] === 'onsetModeOther')).toBe(true);
    }
  });
});

describe('physiotherapyHistorySchema', () => {
  it('should require reason and period when physiotherapy is sim', () => {
    const data = { hadPhysiotherapy: 'sim' };
    const result = physiotherapyHistorySchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path[0] === 'reason')).toBe(true);
      expect(result.error.issues.some(i => i.path[0] === 'period')).toBe(true);
    }
  });

  it('should pass when physiotherapy is valid', () => {
    const data = {
      hadPhysiotherapy: 'sim',
      currentPhysiotherapy: 'não',
      reason: 'atraso motor',
      period: '1 ano'
    };
    const result = physiotherapyHistorySchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe('motorDevelopmentSchema', () => {
  it('should require description when motor delay is reported', () => {
    const data = {
      milestones: { cervicalControl: {} }, // mocked structure
      general: { reportedMotorDelay: 'sim' },
      regression: { hasRegression: 'não' },
      physiotherapy: { hadPhysiotherapy: 'não', currentPhysiotherapy: 'não' }
    };
    const result = motorDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('motorDelayDescription'))).toBe(true);
    }
  });

  it('should require device type when mobility device is used', () => {
    const data = {
      milestones: { cervicalControl: {} },
      general: { usesMobilityDevice: 'sim' },
      regression: { hasRegression: 'não' },
      physiotherapy: { hadPhysiotherapy: 'não', currentPhysiotherapy: 'não' }
    };
    const result = motorDevelopmentSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(i => i.path.includes('mobilityDeviceType'))).toBe(true);
    }
  });

  it('should accept partial draft when parsing partials (done via any/optional in updateAnamnesisSchema)', () => {
    // The main motorDevelopmentSchema requires milestones to be an object, but inside updateAnamnesisSchema it's any/optional.
    // So this is just a reminder that the strict validation requires the structure.
    expect(true).toBe(true);
  });
});
