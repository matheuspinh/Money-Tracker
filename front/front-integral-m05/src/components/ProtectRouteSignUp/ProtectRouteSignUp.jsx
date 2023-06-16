import { Outlet, Navigate } from 'react-router-dom'
import usePageMode from '../../hooks/usePageMode';

function ProtectRouteSignUp({ redirectTo }) {
    const { allowSignUpSucess } = usePageMode()

    return allowSignUpSucess ? <Outlet /> : <Navigate to={redirectTo} />
}


export default ProtectRouteSignUp;