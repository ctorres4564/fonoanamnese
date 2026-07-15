import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../../components/routes/ProtectedRoute'

let mockAuthState: any = { user: null, profile: null, loading: false }

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthState,
}))

describe('ProtectedRoute Component', () => {
  it('shows loading spinner when loading', () => {
    mockAuthState = { user: null, profile: null, loading: true }
    const { container } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('redirects to login if not authenticated', () => {
    mockAuthState = { user: null, profile: null, loading: false }
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('redirects to profile setup if authenticated but no profile', () => {
    mockAuthState = { user: { id: 'user123' }, profile: null, loading: false }
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/profile/setup" element={<div>Profile Setup</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Profile Setup')).toBeInTheDocument()
  })

  it('renders children if authenticated and profile exists', () => {
    mockAuthState = {
      user: { id: 'user123' },
      profile: { crefonoNumber: '123' },
      loading: false,
    }
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })
})
