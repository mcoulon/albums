import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
    const navigationCards = [
        {
            title: 'Artistes',
            description: 'Gérer les artistes de la base de données',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            to: '/artists',
            color: 'blue'
        },
        {
            title: 'Albums',
            description: 'Gérer les albums de la base de données',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            to: '/albums',
            color: 'indigo'
        },
        {
            title: 'Pistes',
            description: 'Gérer les pistes de la base de données',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ),
            to: '/tracks',
            color: 'purple'
        },
        {
            title: 'Genres',
            description: 'Gérer les genres de la base de données',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            to: '/genres',
            color: 'pink'
        },
        {
            title: 'Types de média',
            description: 'Gérer les types de média de la base de données',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
            ),
            to: '/mediatypes',
            color: 'rose'
        }
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Titre de la page */}
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8">
                    Tableau de bord
                </h1>

                {/* Grille de cartes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {navigationCards.map((card, index) => (
                        <Link
                            key={index}
                            to={card.to}
                            className={`block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border-l-4 border-${card.color}-500`}
                        >
                            <div className="flex items-center">
                                <div className={`p-3 rounded-full bg-${card.color}-100 dark:bg-${card.color}-900/20 text-${card.color}-600 dark:text-${card.color}-400 mr-4`}>
                                    {card.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                                        {card.title}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard