import {Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

// Shared sort options used by Home / RestaurantsHeader.
// Default selected value across the app is "Lowest".
export const sortByOptions = {
  lowest: 'Lowest',
  highest: 'Highest',
}

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App
