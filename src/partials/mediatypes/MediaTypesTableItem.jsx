import { Link } from "react-router-dom"
import ApiRequest from "../../services/ApiRequest"

function MediaTypesTableItem({ mediaType, onRefresh }) {
    const handleDelete = async () => {
        try {
            await ApiRequest.delete(`/media-types/${mediaType.id}`)
            onRefresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleRestore = async () => {
        try {
            await ApiRequest.patch(`/media-types/${mediaType.id}/restore`)
            onRefresh()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/25">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-left">{mediaType.name}</div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap w-px">
                <div className="space-x-1">
                    <Link
                        to={`/mediatypes/edit/${mediaType.id}`}
                        className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                    >
                        <span className="sr-only">Edit</span>
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                            <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                        </svg>
                    </Link>
                    {mediaType.deleted_at ? (
                        <button
                            onClick={handleRestore}
                            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
                        >
                            <span className="sr-only">Restore</span>
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                <path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm4.95 11.636L16 6.586l-4.95 5.05h3.2v7.728h3.5v-7.728h3.2z" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
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
    )
}

export default MediaTypesTableItem
