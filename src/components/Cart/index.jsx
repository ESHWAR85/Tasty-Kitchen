import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {FaRupeeSign, FaCheckCircle} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'
import './index.css'

const readCart = () => JSON.parse(localStorage.getItem('cartData')) || []

const writeCart = cartItems => {
  localStorage.setItem('cartData', JSON.stringify(cartItems))
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    setCartItems(readCart())
  }, [])

  const onIncrement = id => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    setCartItems(updatedItems)
    writeCart(updatedItems)
  }

  const onDecrement = id => {
    const target = cartItems.find(item => item.id === id)
    let updatedItems
    if (target && target.quantity > 1) {
      updatedItems = cartItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item,
      )
    } else {
      updatedItems = cartItems.filter(item => item.id !== id)
    }
    setCartItems(updatedItems)
    writeCart(updatedItems)
  }

  const onPlaceOrder = () => {
    setOrderPlaced(true)
    localStorage.removeItem('cartData')
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0,
  )

  const renderSuccessView = () => (
    <div className="cart-page">
      <Header />
      <div className="order-success-container">
        <FaCheckCircle className="success-icon" />
        <h1 className="success-heading">Payment Successful</h1>
        <p className="success-description">
          Thank you for ordering. Your payment is successfully completed.
        </p>
        <Link to="/" className="home-link">
          <button type="button" className="home-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  const renderCartView = () => (
    <div className="cart-page">
      <Header />
      <div className="cart-items-wrapper">
        <ul className="cart-items-list">
          {cartItems.map(item => (
            <li className="cart-item" testid="cartItem" key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-img"
              />
              <h1 className="cart-item-name">{item.name}</h1>

              <div className="cart-item-quantity-container">
                <button
                  type="button"
                  testid="decrement-quantity"
                  className="quantity-btn"
                  onClick={() => onDecrement(item.id)}
                >
                  <HiOutlineMinusSm />
                </button>
                <p testid="item-quantity" className="item-quantity">
                  {item.quantity}
                </p>
                <button
                  type="button"
                  testid="increment-quantity"
                  className="quantity-btn"
                  onClick={() => onIncrement(item.id)}
                >
                  <BsPlus />
                </button>
              </div>

              <div className="cart-item-cost-container">
                <FaRupeeSign className="rupee-icon" />
                <p className="cart-item-cost">{item.cost * item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-total-container">
          <h1 className="order-total-heading">Order Total:</h1>
          <div className="total-price-container">
            <FaRupeeSign className="rupee-icon" />
            <p testid="total-price" className="total-price">
              {totalPrice}
            </p>
          </div>
          <button
            type="button"
            className="place-order-btn"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )

  if (orderPlaced) {
    return renderSuccessView()
  }

  if (cartItems.length === 0) {
    return <CartEmpty />
  }

  return renderCartView()
}

export default Cart
