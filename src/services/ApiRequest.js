import axios from 'axios'

const ApiRequest = axios.create({
    baseURL: 'https://backend-tic.devapp.be/api',
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
})

export default ApiRequest