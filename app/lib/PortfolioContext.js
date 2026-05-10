'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  DEFAULT_DATA,
  getPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  generateId,
} from './portfolioData'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(DEFAULT_DATA)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const loaded = getPortfolioData()
      setData(loaded)
    } catch (e) {
      console.error('Error loading portfolio data:', e)
      setData(DEFAULT_DATA)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    if (isLoaded) {
      savePortfolioData(data)
    }
  }, [data, isLoaded])

  // Personal info actions
  const updatePersonal = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...updates },
    }))
  }, [])

  const updateEducation = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        education: { ...prev.personal.education, ...updates },
      },
    }))
  }, [])

  // Project actions
  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: generateId(),
    }
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
    return newProject.id
  }, [])

  const updateProject = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }))
  }, [])

  const deleteProject = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }, [])

  const reorderProjects = useCallback((newOrder) => {
    setData((prev) => ({
      ...prev,
      projects: newOrder,
    }))
  }, [])

  // Skill actions
  const updateSkillCategory = useCallback((categoryIndex, updates) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex] = { ...newSkills[categoryIndex], ...updates }
      return { ...prev, skills: newSkills }
    })
  }, [])

  const updateSkillItem = useCallback((categoryIndex, itemIndex, updates) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      const newItems = [...newSkills[categoryIndex].items]
      newItems[itemIndex] = { ...newItems[itemIndex], ...updates }
      newSkills[categoryIndex] = { ...newSkills[categoryIndex], items: newItems }
      return { ...prev, skills: newSkills }
    })
  }, [])

  const addSkillItem = useCallback((categoryIndex, skill) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        items: [...newSkills[categoryIndex].items, skill],
      }
      return { ...prev, skills: newSkills }
    })
  }, [])

  const deleteSkillItem = useCallback((categoryIndex, itemIndex) => {
    setData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[categoryIndex] = {
        ...newSkills[categoryIndex],
        items: newSkills[categoryIndex].items.filter((_, i) => i !== itemIndex),
      }
      return { ...prev, skills: newSkills }
    })
  }, [])

  // Experience actions
  const addExperience = useCallback((experience) => {
    const newExp = {
      ...experience,
      id: generateId(),
    }
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
    return newExp.id
  }, [])

  const updateExperience = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    }))
  }, [])

  const deleteExperience = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }))
  }, [])

  // Reset to defaults
  const resetData = useCallback(() => {
    resetPortfolioData()
    setData(DEFAULT_DATA)
  }, [])

  const value = {
    data,
    isLoaded,
    updatePersonal,
    updateEducation,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    updateSkillCategory,
    updateSkillItem,
    addSkillItem,
    deleteSkillItem,
    addExperience,
    updateExperience,
    deleteExperience,
    resetData,
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
