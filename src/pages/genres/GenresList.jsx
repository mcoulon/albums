import { Link } from "react-router-dom"
import GenresTable from "../../partials/genres/GenresTable"

function GenresList() {
    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
                        Genres
                    </h1>
                </div>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg">
                    <Link to="add" className="flex items-center p-2">
                        <svg
                            className="w-4 h-4 fill-current opacity-50 shrink-0"
                        >
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                        </svg>
                        <span className="xs:block ml-2">Ajouter un genre</span>
                    </Link>
                </button>
            </div>
            <div className="flex-grow flex flex-col min-h-0">
                <GenresTable />
            </div>
        </div>
    )
}

export default GenresList
