import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Register from '../../pages/auth/Register'
import { registerUser } from '../../services/auth'

vi.mock('../../services/auth', () => ({
  registerUser: vi.fn(),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  }
})

describe('Register Component', () => {
  it('renders register form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )
    expect(screen.getByText('Criar Conta')).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/^Senha/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), { target: { value: 'different' } })
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument()
    })
  })

  it('navigates to profile setup on successful registration', async () => {
    vi.mocked(registerUser).mockResolvedValueOnce({} as any)

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/^Senha/i), { target: { value: 'password123' } })
    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile/setup', { replace: true })
    })
  })
})
