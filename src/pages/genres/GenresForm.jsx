import GenresSubmit from "../../partials/genres/GenresSubmit"

function GenresForm() {
    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <GenresSubmit />
        </div>
    )
}

export default GenresForm
