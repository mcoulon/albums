import { Navigate, Outlet } from 'react-router-dom';


const useAuth = () => {
    const token = sessionStorage.getItem('token')
    return token ? true : false
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes