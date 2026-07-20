import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [dark, setDark] = useState<boolean>(false)

  // Sync state with html class on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    if (newDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setDark(newDark)
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-teal-650 dark:text-teal-400 hover:opacity-90 transition-opacity"
        >
          FonoAnamnese
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-655 dark:hover:text-teal-400 transition-colors"
          >
            Painel
          </Link>
          <Link
            to="/patients"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-655 dark:hover:text-teal-400 transition-colors"
          >
            Pacientes
          </Link>
        </nav>
      </div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {dark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </header>
  )
}
