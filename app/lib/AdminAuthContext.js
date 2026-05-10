'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  verifyAdminPassword,
  hasAdminPassword,
  setAdminPassword,
  createAdminSession,
  verifyAdminSession,
  clearAdminSession,
} from './portfolioData'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasPassword, setHasPassword] = useState(false)
  const [error, setError] = useState(null)

  // Check session on mount
  useEffect(() => {
    const checkSession = () => {
      const sessionValid = verifyAdminSession()
      const passwordSet = hasAdminPassword()
      
      setIsAuthenticated(sessionValid)
      setHasPassword(passwordSet)
      setIsLoading(false)
    }

    checkSession()
  }, [])

  // Login
  const login = useCallback((password) => {
    setError(null)
    
    if (!password || password.length < 1) {
      setError('Please enter a password')
      return false
    }

    const isValid = verifyAdminPassword(password)
    
    if (isValid) {
      createAdminSession()
      setIsAuthenticated(true)
      return true
    } else {
      setError('Invalid password')
      return false
    }
  }, [])

  // Setup initial password
  const setupPassword = useCallback((password, confirmPassword) => {
    setError(null)
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    const success = setAdminPassword(password)
    
    if (success) {
      createAdminSession()
      setHasPassword(true)
      setIsAuthenticated(true)
      return true
    } else {
      setError('Failed to set password')
      return false
    }
  }, [])

  // Logout
  const logout = useCallback(() => {
    clearAdminSession()
    setIsAuthenticated(false)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = {
    isAuthenticated,
    isLoading,
    hasPassword,
    error,
    login,
    logout,
    setupPassword,
    clearError,
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
