import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ChiefComplaintSection } from '../components/ChiefComplaintSection'

describe('ChiefComplaintSection Component', () => {
  it('renderiza os campos básicos', () => {
    const handleChange = vi.fn()
    render(<ChiefComplaintSection onChange={handleChange} />)

    expect(screen.getByText('Queixa Principal')).toBeInTheDocument()
    expect(screen.getByText(/Queixa principal nas palavras do responsável/)).toBeInTheDocument()
  })

  it('exibe campos condicionais quando onsetMode é outro', async () => {
    const handleChange = vi.fn()
    render(<ChiefComplaintSection onChange={handleChange} />)

    expect(screen.queryByText(/Descreva a forma de início/)).not.toBeInTheDocument()

    const select = screen.getByLabelText(/Forma de início/)
    await userEvent.selectOptions(select, 'outro')

    expect(screen.getByText(/Descreva a forma de início/)).toBeInTheDocument()
  })

  it('valida campos obrigatórios', async () => {
    const handleChange = vi.fn()
    render(<ChiefComplaintSection onChange={handleChange} />)

    // Tenta preencher campo não obrigatório
    const input = screen.getByPlaceholderText(/Idade em anos/)
    await userEvent.type(input, '2')

    await waitFor(() => {
      // Como não preenchemos a Queixa que é obrigatória, isValid = false
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ approximateAgeNoticed: 2 }),
        false,
      )
    })
  })
})
