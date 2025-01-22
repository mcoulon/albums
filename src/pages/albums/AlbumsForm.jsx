import AlbumsSubmit from "../../partials/albums/AlbumsSubmit"

function AlbumsForm() {
    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <AlbumsSubmit />
        </div>
    )
}

export default AlbumsForm
