import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ApiRequest from "../../services/ApiRequest"
import GenresTableItem from "./GenresTableItem"
import Pagination from "../../components/Pagination"

function GenresTable() {
    const [genres, setGenres] = useState([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState({})
    const [links, setLinks] = useState({})

    const fetchGenres = async () => {
        try {
            const response = await ApiRequest.get(`/genres?page=${page}`)
            setGenres(response.data.data)
            setMeta(response.data.meta)
            setLinks(response.data.links)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGenres()
    }, [page])

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    return (
        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                        <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Nom</div>
                                </th>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                            {genres.map((genre) => (
                                <GenresTableItem
                                    key={genre.id}
                                    genre={genre}
                                    onRefresh={fetchGenres}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
                meta={meta}
                links={links}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default GenresTable
