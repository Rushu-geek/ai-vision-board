import { Route, Routes } from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'
// import ProtectedRoutes from './ProtectedRoutes'

const Routing = () => {

    return (

        <Routes>
            {/* <Route element={<ProtectedRoutes />}> */}


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/verify-code" element={<EnterCode />} />
            <Route path="/reset-password" element={<ResetPassword />} /> */}

            <Route path='*' element={<p>Oops! Page not found. </p>} />
        </Routes>
    )
}

export default Routing