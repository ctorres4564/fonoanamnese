import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Header } from '../Header'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated but hasn't completed their professional profile
  // redirect them to the profile creation page, unless they are already there.
  if (!profile && location.pathname !== '/profile/setup') {
    return <Navigate to="/profile/setup" replace />
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
