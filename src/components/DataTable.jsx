import React, { useEffect, useState } from 'react'
import ApiRequest from '../services/ApiRequest'
import Pagination from './Pagination'

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}


function DataTable({ table, columns }) {

    const [items, setItems] = useState([])
    const [links, setLinks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [meta, setMeta] = useState([])


    useEffect(() => {
        const fetchItems = async () => {
            const response = await ApiRequest.get(`/${table}?page=${currentPage}`)
            setItems(response.data.data)
            setLinks(response.data.links)
            setMeta(response.data.meta)
            console.log(response.data)
        }
        fetchItems()
    }, [table, currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
        console.log(page)
    }

    const truncate = (text, length) => {
        return text?.length > length ? text.substring(0, length) + '...' : text
    }

    return (
        <>
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        {columns.map((column, index) => (
                                            <th key={index} scope="col" className="px-6 py-4">{column.label}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, rowIndex) => (
                                        <tr key={rowIndex} className="border-b dark:border-neutral-500">
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                                                    {truncate(getNestedValue(item, column.accessor), 50)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {meta && links && (
                        <div className="flex justify-end mt-4">
                            <Pagination links={links} onPageChange={handlePageChange} meta={meta} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default DataTable
