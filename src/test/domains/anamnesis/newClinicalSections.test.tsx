import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HealthHistorySection } from '../../../domains/anamnesis/health/components/HealthHistorySection'
import { FamilyHistorySection } from '../../../domains/anamnesis/family/components/FamilyHistorySection'
import { ChildRoutineSection } from '../../../domains/anamnesis/routine/components/ChildRoutineSection'

describe('novas seções clínicas', () => {
  it('renderiza Histórico de Saúde com os três grupos solicitados', () => {
    render(<HealthHistorySection onChange={vi.fn()} />)
    expect(
      screen.getByText('Doenças prévias, internações e uso anterior de medicações'),
    ).toBeInTheDocument()
    expect(screen.getByText('Histórico de cirurgias, traumas ou acidentes')).toBeInTheDocument()
    expect(screen.getByText('Uso de medicações atuais')).toBeInTheDocument()
  })

  it('renderiza Histórico Familiar', () => {
    render(<FamilyHistorySection onChange={vi.fn()} />)
    expect(screen.getByText(/dificuldades de fala, audição ou aprendizagem/i)).toBeInTheDocument()
    expect(screen.getByText(/doenças neurológicas ou psiquiátricas/i)).toBeInTheDocument()
  })

  it('renderiza Rotina da Criança e o placeholder de observações', () => {
    render(<ChildRoutineSection onChange={vi.fn()} />)
    expect(screen.getByText('Frequenta escola?')).toBeInTheDocument()
    expect(screen.getByText('Desempenho escolar')).toBeInTheDocument()
    expect(screen.getByText('Socialização')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('O responsável quer informar algo que não foi perguntado?'),
    ).toBeInTheDocument()
  })
})
