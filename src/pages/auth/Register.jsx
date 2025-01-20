import axios from "axios"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("Un truc un peu moins agressif"),
        email: yup.string().required("Email is required").email('Email must be valid'),
        password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
        password_confirmation: yup.string().required("Password confirmation is required").oneOf([yup.ref("password"), null], "Passwords must match")
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
            const response = await axios.post('https://backend-tic.devapp.be/api/register', data)
                .then((response) => {
                    console.log(response)
                    navigate('/login')
                }
                )

            console.log("data")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center min-h-[100vh] items-center bg-gradient-to-br from-gray-50 to-gray-100">
                <h1 className="my-8 font-bold text-4xl font-serif text-gray-800">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[90%] max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register('name')}
                        // onChange={(e) => setData({...data, name : e.target.value})}
                        type="text"
                        name="name"
                        id="name"
                        className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="text-xs mt-1 text-rose-500">
                        {errors?.name?.message}
                    </div>

                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="text-xs mt-1 text-rose-500">
                        {errors?.email?.message}
                    </div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        name="password"
                        id="password"
                        className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="text-xs mt-1 text-rose-500">
                        {errors?.password?.message}
                    </div>
                    <label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        {...register('password_confirmation')}
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="text-xs mt-1 text-rose-500">
                        {errors?.password_confirmation?.message}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register