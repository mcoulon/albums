import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import ApiRequest from '../../services/ApiRequest'
import { Link, useNavigate } from 'react-router-dom'


function Login() {

    const navigate = useNavigate()

    const schema = yup.object().shape({
        email: yup.string().required('The email field is required'),
        password: yup.string().required('The password field is required')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        await axios.get(('https://backend-tic.devapp.be/sanctum/csrf-cookie'))
        try {
            console.log(data)
            // await axios.post('https://backend-tic.devapp.be/api/login', data)
            const response = await ApiRequest.post('/login', data)

            if (response.status === 200 && response.data.data.token) {
                console.log(response.data.data)
                sessionStorage.setItem('token', response.data.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.data.user))

                navigate('/')
            } else if (response.status === 401) {
                throw new Error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            localStorage.clear()
            sessionStorage.clear()
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center min-h-[100vh] items-center bg-gradient-to-br from-gray-50 to-gray-100">
                <h1 className="my-8 font-bold text-4xl font-serif text-gray-800">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[90%] max-w-md bg-white p-8 rounded-xl shadow-lg">
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

export default Login