import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const CartEmpty = () => (
  <>
    <Header />
    <div className="cart-empty-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png"
        alt="empty cart"
        className="cart-empty-img"
      />
      <h1 className="cart-empty-heading">No Order Yet!</h1>
      <p className="cart-empty-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/" className="home-link">
        <button type="button" className="home-btn">
          Order Now
        </button>
      </Link>
    </div>
  </>
)

export default CartEmpty
