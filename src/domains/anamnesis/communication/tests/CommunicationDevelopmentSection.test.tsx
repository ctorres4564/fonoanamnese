import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CommunicationDevelopmentSection } from '../components/CommunicationDevelopmentSection'

describe('CommunicationDevelopmentSection', () => {
  it('renderiza somente os blocos ativos de desenvolvimento da linguagem', () => {
    render(<CommunicationDevelopmentSection onChange={vi.fn()} />)

    expect(screen.getByText('1. Comunicação Pré-Linguística')).toBeInTheDocument()
    expect(screen.getByText('2. Vocalizações e Balbucio')).toBeInTheDocument()
    expect(screen.getByText('3. Modos de Comunicação Utilizados')).toBeInTheDocument()
    expect(screen.queryByText('3. Primeiras Palavras e Frases')).not.toBeInTheDocument()
    expect(screen.queryByText('5. Comunicação Suplementar ou Alternativa (CSA)')).not.toBeInTheDocument()
    expect(screen.queryByText('6. Regressão Comunicativa Geral')).not.toBeInTheDocument()
  })

  it('exibe campos condicionais de regressão em vocalizações e valida campos obrigatórios', () => {
    const { container } = render(<CommunicationDevelopmentSection onChange={vi.fn()} />)

    const regressaoSelect = container.querySelector(
      'select[name="communicationDevelopment.vocalizationHistory.vocalizationRegression"]',
    ) as HTMLSelectElement
    fireEvent.change(regressaoSelect, { target: { value: 'sim' } })

    expect(screen.getByText('Idade aproximada da perda (meses) *')).toBeInTheDocument()
    expect(screen.getByText('Descrição da perda *')).toBeInTheDocument()
  })


  it('exibe descrição para outro modo de comunicação', () => {
    const { container } = render(<CommunicationDevelopmentSection onChange={vi.fn()} />)

    const outroCheckbox = container.querySelector('input[value="outro"]') as HTMLInputElement
    fireEvent.click(outroCheckbox)

    expect(screen.getByText('Descrição para outro modo de comunicação *')).toBeInTheDocument()
  })

})
