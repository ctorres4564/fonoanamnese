import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

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
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">FonoAnamnese</h1>
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
