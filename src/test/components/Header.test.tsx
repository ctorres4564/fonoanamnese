import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Header } from '../../components/Header'
import { MemoryRouter } from 'react-router-dom'

describe('Header Component', () => {
  beforeEach(() => {
    // Clear localStorage and documentElement classes before each test
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders FonoAnamnese title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    expect(screen.getByText('FonoAnamnese')).toBeInTheDocument()
  })

  it('toggles dark class on documentElement and stores in localStorage when clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    const button = screen.getByRole('button', { name: /toggle dark mode/i })

    // Default: light mode (no dark class, no storage value)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    // First click: Toggle to dark mode
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    // Second click: Toggle back to light mode
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('syncs theme state with documentElement dark class on mount', () => {
    // Add dark class to documentElement before rendering
    document.documentElement.classList.add('dark')

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )
    const button = screen.getByRole('button', { name: /toggle dark mode/i })


    // Clicking should toggle it to light mode since it started as dark
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })
})

