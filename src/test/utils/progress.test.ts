import { describe, it, expect } from 'vitest'
import { calculateAnamnesisProgress } from '../../utils/progress'

describe('calculateAnamnesisProgress', () => {
  const activeSections = [
    'interviewData',
    'chiefComplaint',
    'pregnancyBirthNeonatal',
    'motorDevelopment',
  ] as const

  it('should add section to completed and calculate correct percentage', () => {
    const result = calculateAnamnesisProgress(['interviewData'], 'chiefComplaint', true, activeSections)
    expect(result.newCompleted).toEqual(['interviewData', 'chiefComplaint'])
    expect(result.completionPercentage).toBe(50) // 2 out of 4 is 50%
  })

  it('should not add duplicate section', () => {
    const result = calculateAnamnesisProgress(['interviewData'], 'interviewData', true, activeSections)
    expect(result.newCompleted).toEqual(['interviewData'])
    expect(result.completionPercentage).toBe(25)
  })

  it('should remove section if invalid', () => {
    const result = calculateAnamnesisProgress(
      ['interviewData', 'chiefComplaint'],
      'chiefComplaint',
      false,
      activeSections,
    )
    expect(result.newCompleted).toEqual(['interviewData'])
    expect(result.completionPercentage).toBe(25)
  })

  it('should handle zero total sections without dividing by zero error', () => {
    const result = calculateAnamnesisProgress([], 'interviewData', true, [])
    expect(result.completionPercentage).toBe(0)
  })

  it('should ensure percentage does not exceed 100', () => {
    // If somehow total is less than completed
    const result = calculateAnamnesisProgress(
      ['interviewData', 'chiefComplaint'],
      'pregnancyBirthNeonatal',
      true,
      ['interviewData', 'chiefComplaint'],
    )
    expect(result.completionPercentage).toBe(100)
  })

  it('should ensure percentage does not go below 0', () => {
    const result = calculateAnamnesisProgress([], 'interviewData', false, activeSections)
    expect(result.completionPercentage).toBe(0)
  })

  it('ignores completed legacy sections when recalculating progress', () => {
    const result = calculateAnamnesisProgress(
      ['interviewData', 'languageDevelopment', 'speechDevelopment'],
      'chiefComplaint',
      true,
      activeSections,
    )

    expect(result.newCompleted).toEqual(['interviewData', 'chiefComplaint'])
    expect(result.completionPercentage).toBe(50)
  })
})
