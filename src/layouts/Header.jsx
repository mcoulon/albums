import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import ApiRequest from '../services/ApiRequest'

function Header() {
    const location = useLocation()

    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await ApiRequest.post('/logout')
        if (response.status === 200) {
            localStorage.clear()
            sessionStorage.clear()
            navigate('/login')
        }
    }

    // Fonction pour obtenir le titre de la page en fonction de l'URL
    const getPageTitle = () => {
        const path = location.pathname
        if (path.includes('/artists')) return 'Gestion des artistes'
        if (path.includes('/albums')) return 'Gestion des albums'
        if (path.includes('/tracks')) return 'Gestion des pistes'
        if (path.includes('/genres')) return 'Gestion des genres'
        if (path.includes('/mediatypes')) return 'Gestion des types de média'
        return 'Dashboard'
    }

    return (
        <header className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {getPageTitle()}
                        </h1>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                        {/* Theme toggle */}
                        <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full">
                            <span className="sr-only">Switch Theme</span>
                            <svg className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400" viewBox="0 0 16 16">
                                <path d="M7 0h2v2H7V0ZM12.88 1.637l1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7ZM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414-1.414 1.414ZM7 14h2v2H7v-2ZM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415-1.415 1.414ZM0 7h2v2H0V7ZM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12 3.05 1.706Z" />
                            </svg>
                        </button>

                        {/* Divider */}
                        <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />

                        {/* User button */}
                        <button onClick={handleLogout} className="inline-flex justify-center items-center space-x-2 px-3 py-2 rounded text-sm font-medium text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                            <span>Se déconnecter</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
