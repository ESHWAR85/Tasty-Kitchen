import {Navigate, Outlet} from 'react-router-dom'
import Cookies from 'js-cookie'

// Wrap protected route groups in App.jsx:
//   <Route element={<ProtectedRoute />}>
//     <Route path="/" element={<Home />} />
//     ...
//   </Route>
// If there is no jwt_token cookie, the user is redirected to /login.
const ProtectedRoute = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
