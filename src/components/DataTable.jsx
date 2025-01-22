import React, { useState, useEffect } from 'react'
import ApiRequest from '../services/ApiRequest'
import Pagination from './Pagination'
import { Link } from "react-router-dom"

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

function DataTable({ table, columns }) {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState(null)
    const [links, setLinks] = useState(null)

    const fetchItems = async () => {
        try {
            const response = await ApiRequest.get(`/${table}?page=${page}`)
            setItems(response.data.data)
            setMeta(response.data.meta)
            setLinks(response.data.links)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [page])

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleDelete = async (id) => {
        try {
            await ApiRequest.delete(`/${table}/${id}`)
            fetchItems()
        } catch (error) {
            console.log(error)
        }
    }

    const handleRestore = async (id) => {
        try {
            await ApiRequest.patch(`/${table}/${id}/restore`)
            fetchItems()
        } catch (error) {
            console.log(error)
        }
    }

    const truncate = (text, length) => {
        if (!text) return ''
        return text.length > length ? text.substring(0, length) + '...' : text
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} scope="col" className="px-6 py-4">
                                            {column.label}
                                        </th>
                                    ))}
                                    <th scope="col" className="px-6 py-4">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, rowIndex) => (
                                    <tr key={rowIndex} className="border-b dark:border-neutral-500">
                                        {columns.map((column, colIndex) => (
                                            <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                                                {truncate(getNestedValue(item, column.accessor), 30)}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap w-px">
                                            <div className="space-x-1">
                                                <Link
                                                    to={`/${table}/edit/${item.id}`}
                                                    className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                                                >
                                                    <span className="sr-only">Edit</span>
                                                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                        <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                                                    </svg>
                                                </Link>
                                                {item.deleted_at ? (
                                                    <button
                                                        onClick={() => handleRestore(item.id)}
                                                        className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                                                    >
                                                        <span className="sr-only">Restore</span>
                                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                            <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm4.95 11.636L16 6.586l-4.95 5.05h3.2v7.728h3.5v-7.728h3.2z" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-rose-500 hover:text-rose-600 rounded-full"
                                                    >
                                                        <span className="sr-only">Delete</span>
                                                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                                            <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {meta && links && (
                    <div className="flex justify-end mt-4 mr-10">
                        <Pagination links={links} onPageChange={handlePageChange} meta={meta} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default DataTable
