import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequest from "../../services/ApiRequest";
import { useEffect, useState } from "react";

function GenresSubmit() {
    const [genre, setGenre] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            ApiRequest.get(`/genres/${id}`)
                .then((response) => {
                    setGenre(response.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [id])

    const schema = yup.object().shape({
        name: yup.string().required("Le nom est requis"),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            if (id) {
                await ApiRequest.put(`/genres/${id}`, data)
            } else {
                await ApiRequest.post(`/genres`, data)
            }
            navigate('/genres')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-[80vh] items-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-[90%] max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {id ? 'Modifier un genre' : 'Ajouter un genre'}
                    </h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Nom du genre
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                value={genre?.name}
                                onChange={(e) => {
                                    if (id) {
                                        setGenre({ ...genre, name: e.target.value })
                                    }
                                }}
                            />
                            <div className="text-xs mt-1 text-rose-500">
                                {errors.name && <span>{errors.name.message}</span>}
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

export default GenresSubmit
