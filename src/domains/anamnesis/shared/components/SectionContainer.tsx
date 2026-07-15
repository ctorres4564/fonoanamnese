import React from 'react'

interface SectionContainerProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function SectionContainer({ title, description, children }: SectionContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm border border-gray-200 dark:border-gray-850 p-6 mb-6 transition-colors">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{title}</h2>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
