import React from 'react'
import { Link } from 'react-router-dom'
import ApiRequest from '../../services/ApiRequest'

function ArtistsTableItem({ artist, onRefresh }) {

    const handleDelete = async () => {
        try {
            await ApiRequest.delete(`/artists/${artist.id}`)
            onRefresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleRestore = async () => {
        try {
            await ApiRequest.patch(`/artists/${artist.id}/restore`)
            onRefresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/25">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-8 h-8 shrink-0 mr-3">
                        <div className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center font-medium">
                            {artist.name.charAt(0)}
                        </div>
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                        {artist.name}
                    </div>
                </div>
            </td>

            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex justify-center space-x-3">
                    <Link to={`/artists/edit/${artist.id}`} className="text-indigo-500 hover:text-indigo-600">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                    </Link>
                    {artist.deleted_at ? (
                        <button onClick={handleRestore} className="text-green-500 hover:text-green-600">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </button>
                    )}

                </div>
            </td>
        </tr>
    )
}

export default ArtistsTableItem