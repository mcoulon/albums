import { useState, useEffect } from 'react'
import ApiRequest from '../../services/ApiRequest'
import ArtistsTableItem from './ArtistsTableItem'
import Pagination from '../../components/Pagination'

function ArtistsTable() {
    const [artists, setArtists] = useState([])
    const [meta, setMeta] = useState(null)
    const [links, setLinks] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchArtists = async () => {
        try {
            const response = await ApiRequest.get(`/artists?page=${currentPage}`)
            setArtists(response.data.data)
            setMeta(response.data.meta)
            setLinks(response.data.links)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArtists()
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="flex flex-col h-full justify-center items-center">
            <div className="flex flex-col h-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 w-5/6">
                <div className="border-b border-slate-200 dark:border-slate-700">
                    <table className="w-full">
                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th className="px-4 py-4 whitespace-nowrap">
                                    <div className="font-semibold text-left">Artist Name</div>
                                </th>
                                <th className="px-4 py-4 whitespace-nowrap">
                                    <div className="font-semibold text-center">Actions</div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="flex-grow overflow-auto">
                    <table className="w-full">
                        <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                            {artists.map(artist => (
                                <ArtistsTableItem 
                                    key={artist.id} 
                                    artist={artist} 
                                    onRefresh={fetchArtists}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {meta && links && (
                    <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mb-6">
                        <Pagination meta={meta} links={links} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArtistsTable