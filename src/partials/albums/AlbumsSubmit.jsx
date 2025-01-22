import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequest from "../../services/ApiRequest";
import { useEffect, useState } from "react";

function AlbumsSubmit() {
    const [album, setAlbum] = useState({})
    const [artists, setArtists] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        ApiRequest.get('/artists/all')
            .then((response) => {
                console.log(response.data)
                setArtists(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        if (id) {
            ApiRequest.get(`/albums/${id}`)
                .then((response) => {
                    setAlbum(response.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [id])

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        artist_id: yup.string().required("Artist is required"),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (album.id) {
            setValue('title', album.title)
            setValue('artist_id', album.artist_id)
        }
    }, [album, setValue])

    const onSubmit = async (data) => {
        try {
            if (id) {
                await ApiRequest.put(`/albums/${id}`, data)
            } else {
                await ApiRequest.post(`/albums`, data)
            }
            navigate('/albums')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-[80vh] items-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-[90%] max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {id ? 'Modifier un album' : 'Ajouter un album'}
                    </h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Titre de l'album
                            </label>
                            <input
                                {...register("title")}
                                type="text"
                                id="title"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={album?.title}
                                onChange={(e) => {
                                    if (id) {
                                        setAlbum({ ...album, title: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.title && <span>{errors.title.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="artist_id" className="text-sm font-medium text-gray-700">
                                Artiste
                            </label>
                            <select
                                {...register("artist_id")}
                                id="artist_id"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={album?.artist_id}
                                onChange={(e) => {
                                    if (id) {
                                        setAlbum({ ...album, artist_id: e.target.value })
                                    }
                                }}
                            >
                                <option value="">Sélectionner un artiste</option>
                                {artists.map((artist) => (
                                    <option key={artist.id} value={artist.id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.artist_id && <span>{errors.artist_id.message}</span>}
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg w-full"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AlbumsSubmit
