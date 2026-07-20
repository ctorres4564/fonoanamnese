import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { InterviewDataSection } from '../components/InterviewDataSection'

describe('InterviewDataSection Component', () => {
  it('renderiza os campos básicos', () => {
    const handleChange = vi.fn()
    render(<InterviewDataSection onChange={handleChange} />)

    expect(screen.getByText('Dados da Entrevista')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome do paciente')).toBeInTheDocument()
    expect(screen.getByText(/Data da Entrevista/)).toBeInTheDocument()
    expect(screen.getByText(/Entrevistado/)).toBeInTheDocument()
    expect(screen.getByText(/Vínculo/)).toBeInTheDocument()
  })

  it('exibe campos condicionais quando necessário (local = outro)', async () => {
    const handleChange = vi.fn()
    render(<InterviewDataSection onChange={handleChange} />)

    // O campo de descrição não deve estar presente inicialmente
    expect(screen.queryByText(/Descrição do Local/)).not.toBeInTheDocument()

    const locationSelect = screen.getByLabelText('Local')
    await userEvent.selectOptions(locationSelect, 'outro')

    // Agora o campo deve aparecer
    expect(screen.getByText(/Descrição do Local/)).toBeInTheDocument()
  })

  it('valida campos obrigatórios ao disparar onChange', async () => {
    const handleChange = vi.fn()
    render(<InterviewDataSection onChange={handleChange} />)

    // preenchemos um campo pra disparar a mudança e aguardar validação
    const intervieweeInput = screen.getByPlaceholderText('Nome do entrevistado')
    await userEvent.type(intervieweeInput, 'Maria')

    await waitFor(() => {
      // Como não preenchemos Data e Vínculo (que são obrigatórios), o isValid deve ser falso
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ interviewee: 'Maria' }),
        false,
      )
    })
  })

  it('permite registrar ausência de diagnóstico e investigação sem exigir diagnóstico ou CID', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<InterviewDataSection onChange={handleChange} />)

    expect(screen.getByRole('option', { name: 'Sem diagnóstico informado' })).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Situação diagnóstica'), 'under_investigation')
    expect(screen.queryByLabelText('Diagnóstico *')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/CID/)).not.toBeInTheDocument()
  })

  it('exibe e permite editar os campos de diagnóstico estabelecido com CID opcional', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(
      <InterviewDataSection
        initialData={{
          diagnosticStatus: 'established',
          diagnosis: 'Diagnóstico informado pela família',
        }}
        onChange={handleChange}
      />,
    )

    const diagnosis = screen.getByLabelText('Diagnóstico *')
    expect(diagnosis).toHaveValue('Diagnóstico informado pela família')
    expect(screen.getByLabelText('CID (opcional)')).toHaveValue('')
    await user.clear(diagnosis)
    await user.type(diagnosis, 'Diagnóstico atualizado')
    await user.type(screen.getByLabelText('CID (opcional)'), 'F00.0')

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ diagnosis: 'Diagnóstico atualizado', diagnosisCid: 'F00.0' }),
        expect.any(Boolean),
      )
    })
  })
})
