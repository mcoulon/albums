import React, { createContext, useContext, useState } from 'react'

const LayoutContext = createContext()

export function useLayout() {
    return useContext(LayoutContext)
}

function LayoutProvider({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [theme, setTheme] = useState('light')

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        // Ajouter/supprimer la classe dark sur le html
        document.documentElement.classList.toggle('dark')
    }

    const value = {
        sidebarOpen,
        toggleSidebar,
        theme,
        toggleTheme
    }

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutProvider
