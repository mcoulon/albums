import React from 'react'

function Pagination({ meta, links, onPageChange }) {
    const { current_page, last_page } = meta

    return (
        <div className="flex justify-center py-4">
            <nav className="flex space-x-4" aria-label="Pagination">
                <button
                    onClick={() => onPageChange(current_page - 1)}
                    disabled={!links.prev}
                    className={`px-3 py-2 rounded-md ${
                        !links.prev
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                >
                    Previous
                </button>

                <span className="px-3 py-2 text-slate-600 dark:text-slate-300">
                    Page {current_page} of {last_page}
                </span>

                <button
                    onClick={() => onPageChange(current_page + 1)}
                    disabled={!links.next}
                    className={`px-3 py-2 rounded-md ${
                        !links.next
                            ? 'text-slate-400 cursor-not-allowed'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                >
                    Next
                </button>
            </nav>
        </div>
    )
}

export default Pagination