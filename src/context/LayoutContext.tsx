'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type SidebarVariant = 'inset' | 'sidebar' | 'floating'
export type LayoutMode = 'default' | 'compact' | 'full'
export type Direction = 'ltr' | 'rtl'

interface LayoutContextType {
  variant: SidebarVariant
  setVariant: (v: SidebarVariant) => void
  layout: LayoutMode
  setLayout: (l: LayoutMode) => void
  direction: Direction
  setDirection: (d: Direction) => void
  resetLayout: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariantState] = useState<SidebarVariant>('sidebar')
  const [layout, setLayoutState] = useState<LayoutMode>('default')
  const [direction, setDirectionState] = useState<Direction>('ltr')

  useEffect(() => {
    const savedVariant = localStorage.getItem('admin-variant') as SidebarVariant
    const savedLayout = localStorage.getItem('admin-layout') as LayoutMode
    const savedDirection = localStorage.getItem('admin-direction') as Direction

    if (savedVariant) setVariantState(savedVariant)
    if (savedLayout) setLayoutState(savedLayout)
    if (savedDirection) setDirectionState(savedDirection)
  }, [])

  const setVariant = (v: SidebarVariant) => {
    setVariantState(v)
    localStorage.setItem('admin-variant', v)
  }

  const setLayout = (l: LayoutMode) => {
    setLayoutState(l)
    localStorage.setItem('admin-layout', l)
  }

  const setDirection = (d: Direction) => {
    setDirectionState(d)
    localStorage.setItem('admin-direction', d)
  }

  const resetLayout = () => {
    setVariant('sidebar')
    setLayout('default')
    setDirection('ltr')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.dir = direction
  }, [direction])

  return (
    <LayoutContext.Provider value={{ 
      variant, setVariant, 
      layout, setLayout, 
      direction, setDirection,
      resetLayout 
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
