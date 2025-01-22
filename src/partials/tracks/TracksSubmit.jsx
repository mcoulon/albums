import React from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequest from "../../services/ApiRequest";
import { useEffect, useState } from "react";

function TracksSubmit() {
    const [track, setTrack] = useState({})
    const [albums, setAlbums] = useState([])
    const [genres, setGenres] = useState([])
    const [mediaTypes, setMediaTypes] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // Charger les données pour les selects
        ApiRequest.get('/albums/all')
            .then((response) => {
                setAlbums(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        ApiRequest.get('/genres/all')
            .then((response) => {
                setGenres(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        ApiRequest.get('/media-types/all')
            .then((response) => {
                setMediaTypes(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        // Charger les données du track en mode édition
        if (id) {
            ApiRequest.get(`/tracks/${id}`)
                .then((response) => {
                    setTrack(response.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [id])

    const schema = yup.object().shape({
        name: yup.string().required("Le nom est requis"),
        album_id: yup.string().required("L'album est requis"),
        media_type_id: yup.string().required("Le type de média est requis"),
        genre_id: yup.string().required("Le genre est requis"),
        composer: yup.string().nullable(),
        milliseconds: yup.number().required("La durée est requise").min(0, "La durée doit être positive"),
        bytes: yup.number().required("La taille est requise").min(0, "La taille doit être positive"),
        unit_price: yup.number().required("Le prix est requis").min(0, "Le prix doit être positif")
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    })

    // Mettre à jour les valeurs du formulaire quand on charge les données en édition
    useEffect(() => {
        if (track.id) {
            setValue('name', track.name)
            setValue('album_id', track.album_id)
            setValue('media_type_id', track.media_type_id)
            setValue('genre_id', track.genre_id)
            setValue('composer', track.composer)
            setValue('milliseconds', track.milliseconds)
            setValue('bytes', track.bytes)
            setValue('unit_price', track.unit_price)
        }
    }, [track, setValue])

    const onSubmit = async (data) => {
        try {
            if (id) {
                await ApiRequest.put(`/tracks/${id}`, data)
            } else {
                await ApiRequest.post(`/tracks`, data)
            }
            navigate('/tracks')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-[80vh] items-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-[90%] max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {id ? 'Modifier une piste' : 'Ajouter une piste'}
                    </h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Nom de la piste
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.name}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, name: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.name && <span>{errors.name.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="album_id" className="text-sm font-medium text-gray-700">
                                Album
                            </label>
                            <select
                                {...register("album_id")}
                                id="album_id"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.album_id}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, album_id: e.target.value })
                                    }
                                }}
                            >
                                <option value="">Sélectionner un album</option>
                                {albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.album_id && <span>{errors.album_id.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="media_type_id" className="text-sm font-medium text-gray-700">
                                Type de média
                            </label>
                            <select
                                {...register("media_type_id")}
                                id="media_type_id"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.media_type_id}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, media_type_id: e.target.value })
                                    }
                                }}
                            >
                                <option value="">Sélectionner un type de média</option>
                                {mediaTypes.map((mediaType) => (
                                    <option key={mediaType.id} value={mediaType.id}>
                                        {mediaType.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.media_type_id && <span>{errors.media_type_id.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="genre_id" className="text-sm font-medium text-gray-700">
                                Genre
                            </label>
                            <select
                                {...register("genre_id")}
                                id="genre_id"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.genre_id}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, genre_id: e.target.value })
                                    }
                                }}
                            >
                                <option value="">Sélectionner un genre</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.genre_id && <span>{errors.genre_id.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="composer" className="text-sm font-medium text-gray-700">
                                Compositeur
                            </label>
                            <input
                                {...register("composer")}
                                type="text"
                                id="composer"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.composer}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, composer: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.composer && <span>{errors.composer.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="milliseconds" className="text-sm font-medium text-gray-700">
                                Durée (ms)
                            </label>
                            <input
                                {...register("milliseconds")}
                                type="number"
                                id="milliseconds"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.milliseconds}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, milliseconds: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.milliseconds && <span>{errors.milliseconds.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="bytes" className="text-sm font-medium text-gray-700">
                                Taille (bytes)
                            </label>
                            <input
                                {...register("bytes")}
                                type="number"
                                id="bytes"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.bytes}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, bytes: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.bytes && <span>{errors.bytes.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="unit_price" className="text-sm font-medium text-gray-700">
                                Prix unitaire
                            </label>
                            <input
                                {...register("unit_price")}
                                type="number"
                                step="0.01"
                                id="unit_price"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={track?.unit_price}
                                onChange={(e) => {
                                    if (id) {
                                        setTrack({ ...track, unit_price: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.unit_price && <span>{errors.unit_price.message}</span>}
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

export default TracksSubmit