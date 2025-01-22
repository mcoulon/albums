import axios from 'axios'

const ApiRequest = axios.create({
    baseURL: 'https://backend-tic.devapp.be/api',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})

ApiRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.clear()
            sessionStorage.clear()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default ApiRequest