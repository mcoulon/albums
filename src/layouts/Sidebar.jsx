import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {

    const [user, setUser] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('user')) return
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        <div className="flex flex-col w-64 bg-slate-800">
            {/* Logo */}
            <NavLink
                to="/"
                className="flex items-center justify-center h-16 bg-slate-900"
            >
                {/* <img src="/logo.png" alt="Logo" className="w-8 h-8" /> */}
                <span className="text-lg font-bold text-white">MusicDB</span>
            </NavLink>

            {/* Navigation */}
            <nav className="flex-grow px-4 pb-4 space-y-1">
                <NavLink
                    to="/artists"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`
                    }
                >
                    Artistes
                </NavLink>
                <NavLink
                    to="/albums"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`
                    }
                >
                    Albums
                </NavLink>
                <NavLink
                    to="/tracks"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`
                    }
                >
                    Pistes
                </NavLink>
                <NavLink
                    to="/genres"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`
                    }
                >
                    Genres
                </NavLink>
                <NavLink
                    to="/mediatypes"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-700'
                        }`
                    }
                >
                    Types de média
                </NavLink>
            </nav>

            {/* User */}
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-slate-300">{user?.role?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
