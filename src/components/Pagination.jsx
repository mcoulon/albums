import React from 'react'

function Pagination({ meta: { current_page, last_page, from, to, total }, links, onPageChange }) {
    // Générer la liste des pages à afficher
    const getPageNumbers = () => {
        const delta = 2; // Nombre de pages à afficher de chaque côté
        const range = [];
        const rangeWithDots = [];

        // Toujours afficher la première page
        range.push(1);

        // Calculer les pages à afficher
        for (let i = current_page - delta; i <= current_page + delta; i++) {
            if (i > 1 && i < last_page) {
                range.push(i);
            }
        }

        // Toujours afficher la dernière page
        if (last_page > 1) {
            range.push(last_page);
        }

        // Ajouter les points de suspension si nécessaire
        let prev = null;
        for (const i of range) {
            if (prev) {
                if (i - prev === 2) {
                    rangeWithDots.push(prev + 1);
                } else if (i - prev !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
                <ul className="flex justify-center space-x-2">
                    {/* Premier */}
                    <li>
                        <button
                            onClick={() => onPageChange(1)}
                            disabled={!links.prev}
                            className={`px-3 py-2 rounded-lg border ${!links.prev
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700'
                                : 'border-slate-200 hover:border-slate-300 text-blue-600 dark:border-slate-700 dark:hover:border-slate-600'
                                }`}
                        >
                            «
                        </button>
                    </li>
                    {/* Précédent */}
                    <li>
                        <button
                            onClick={() => onPageChange(current_page - 1)}
                            disabled={!links.prev}
                            className={`px-3 py-2 rounded-lg border ${!links.prev
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700'
                                : 'border-slate-200 hover:border-slate-300 text-blue-600 dark:border-slate-700 dark:hover:border-slate-600'
                                }`}
                        >
                            ‹
                        </button>
                    </li>

                    {/* Pages numériques */}
                    {getPageNumbers().map((pageNumber, index) => (
                        <li key={index}>
                            {pageNumber === '...' ? (
                                <span className="px-3 py-2">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(pageNumber)}
                                    className={`px-3 py-2 rounded-lg border ${
                                        pageNumber === current_page
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-slate-200 hover:border-slate-300 text-blue-600 dark:border-slate-700 dark:hover:border-slate-600'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            )}
                        </li>
                    ))}

                    {/* Suivant */}
                    <li>
                        <button
                            onClick={() => onPageChange(current_page + 1)}
                            disabled={!links.next}
                            className={`px-3 py-2 rounded-lg border ${!links.next
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700'
                                : 'border-slate-200 hover:border-slate-300 text-blue-600 dark:border-slate-700 dark:hover:border-slate-600'
                                }`}
                        >
                            ›
                        </button>
                    </li>
                    {/* Dernier */}
                    <li>
                        <button
                            onClick={() => onPageChange(last_page)}
                            disabled={!links.next}
                            className={`px-3 py-2 rounded-lg border ${!links.next
                                ? 'border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700'
                                : 'border-slate-200 hover:border-slate-300 text-blue-600 dark:border-slate-700 dark:hover:border-slate-600'
                                }`}
                        >
                            »
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Affichage de{' '}
                <span className="font-medium text-slate-600 dark:text-slate-300">
                    {from}
                </span>{' '}
                à{' '}
                <span className="font-medium text-slate-600 dark:text-slate-300">
                    {to}
                </span>{' '}
                sur{' '}
                <span className="font-medium text-slate-600 dark:text-slate-300">
                    {total}
                </span>{' '}
                résultats
            </div>
        </div>
    )
}

export default Pagination