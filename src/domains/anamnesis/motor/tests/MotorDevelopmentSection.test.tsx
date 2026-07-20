import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MotorDevelopmentSection } from '../components/MotorDevelopmentSection'

describe('MotorDevelopmentSection', () => {
  const mockOnChange = vi.fn()

  const Wrapper = () => {
    return <MotorDevelopmentSection onChange={mockOnChange} />
  }

  it('renderiza somente os grupos motores ativos e mantém coordenação motora fina', () => {
    render(<Wrapper />)
    expect(screen.getByText('Marcos Motores')).toBeInTheDocument()
    expect(screen.getByText('Marcos Iniciais')).toBeInTheDocument()
    expect(screen.getByText('Locomoção')).toBeInTheDocument()
    expect(screen.getByText('Coordenação Motora Fina')).toBeInTheDocument()
    expect(screen.queryByText('Equilíbrio e Coordenação Global')).not.toBeInTheDocument()
    expect(screen.queryByText('5. Regressão')).not.toBeInTheDocument()
    expect(screen.queryByText('6. Histórico Terapêutico')).not.toBeInTheDocument()
    expect(screen.queryByText('7. Condições Gerais')).not.toBeInTheDocument()
  })

  it('should show acquisition age when milestone status is adquirido', () => {
    const { container } = render(<Wrapper />)

    // Select the "Sustentação cervical" status select
    const select = container.querySelector(
      'select[name="motorDevelopment.milestones.cervicalControl.status"]',
    )
    fireEvent.change(select!, { target: { value: 'adquirido' } })

    expect(screen.getByText('Idade em meses')).toBeInTheDocument()
    expect(screen.getByText('Idade aproximada (descrição)')).toBeInTheDocument()
    expect(screen.getByText('Modo de aquisição')).toBeInTheDocument()
  })

})
