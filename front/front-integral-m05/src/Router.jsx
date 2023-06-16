import { Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectRouteSignUp from './components/ProtectRouteSignUp/ProtectRouteSignUp'
import Charges from './pages/Charges'
import Clients from './pages/Clients'
import Home from './pages/Home'
import LogIn from './pages/Login'
import SignUpConcluded from './pages/SignUpConcluded'
import SignUpEmail from './pages/SignUpEmail/index'
import SignUpPassword from './pages/SignUpPassword'
import SingleClient from './pages/SingleClient'

function Router() {

  return (
    <Routes>
      <Route path='/login' element={<LogIn />} />

      <Route path='/sign-up' element={<SignUpEmail />} />
      <Route path='/sign-up/password' element={<SignUpPassword />} />
      <Route path='/sign-up' element={<ProtectRouteSignUp redirectTo={'/sign-up'} />}>
        <Route path='/sign-up/finish' element={<SignUpConcluded />} />
      </Route>

      <Route path='/' element={<ProtectedRoute redirectTo='/login' />} >
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/clients/:id' element={<SingleClient />} />
        <Route path='/charges' element={<Charges />} />
      </Route>

      <Route path='*' element={<h1>404 - Opa, você está indo muito além do que qualquer pessoa já foi!</h1>} />
    </Routes>
  )
}

export default Router;
