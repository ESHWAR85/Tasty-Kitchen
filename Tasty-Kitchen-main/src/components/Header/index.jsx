import {useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaBars, FaTimes} from 'react-icons/fa'

import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHomeActive = location.pathname === '/'
  const isCartActive = location.pathname === '/cart'

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen)
  }

  const renderNavLinks = () => (
    <ul className="nav-links-list">
      <li>
        <Link
          to="/"
          className={isHomeActive ? 'nav-link nav-link-active' : 'nav-link'}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/cart"
          className={isCartActive ? 'nav-link nav-link-active' : 'nav-link'}
          onClick={() => setMenuOpen(false)}
        >
          Cart
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="nav-bar">
      <div className="nav-bar-content">
        <Link to="/" className="nav-brand-link">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
            alt="website logo"
            className="nav-logo-img"
          />
          <h1 className="nav-brand-heading">TASTY KITCHENS</h1>
        </Link>

        <div className="nav-links-desktop">
          {renderNavLinks()}
          <button
            type="button"
            className="logout-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle-btn"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-links-mobile">
          {renderNavLinks()}
          <button
            type="button"
            className="logout-btn logout-btn-mobile"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Header
