import { Outlet, Navigate } from 'react-router-dom'
import { getItem, removeItem } from '../../utils/localStorage';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'


function ProtectedRoute({ redirectTo }) {
    const navigateTo = useNavigate()
    const token = getItem('token');

    const auth = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const verifyToken = async () => {
        try {
            const responseGetUser = await api.get('/usuario', auth)

        } catch (error) {
            removeItem('token')
            navigateTo('/login')
            return
        }

    }

    verifyToken()

    return token ? <Outlet /> : <Navigate to={redirectTo} />
}


export default ProtectedRoute;