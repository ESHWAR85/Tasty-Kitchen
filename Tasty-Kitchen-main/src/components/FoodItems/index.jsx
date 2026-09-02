import {useState} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

const readCart = () => JSON.parse(localStorage.getItem('cartData')) || []
const writeCart = items => localStorage.setItem('cartData', JSON.stringify(items))

const FoodItems = ({foodItem}) => {
  const [count, setCount] = useState(0)

  const updateCart = newCount => {
    const items = readCart()
    if (newCount === 0) {
      writeCart(items.filter(item => item.id !== foodItem.id))
      return
    }
    const newItem = {cost: foodItem.cost, quantity: newCount, id: foodItem.id, imageUrl: foodItem.imageUrl, name: foodItem.name}
    const index = items.findIndex(item => item.id === foodItem.id)
    if (index === -1) items.push(newItem)
    else items[index] = newItem
    writeCart(items)
  }

  const addItem = () => { setCount(1); updateCart(1) }
  const increment = () => { const next = count + 1; setCount(next); updateCart(next) }
  const decrement = () => {
    if (count === 0) return
    const next = count - 1
    setCount(next)
    updateCart(next)
  }

  return (
    <li className="food-item-card" testid="foodItem">
      <img src={foodItem.imageUrl} alt="food item" className="food-item-img" />
      <div className="food-item-details">
        <h1 className="food-item-name">{foodItem.name}</h1>
        <div className="food-item-cost-container"><FaRupeeSign className="rupee-icon" /><p className="food-item-cost">{foodItem.cost}</p></div>
        <div className="food-item-rating-container"><FaStar className="star-icon" /><p className="food-item-rating">{foodItem.rating}</p></div>
        {count === 0 ? (
          <button type="button" className="add-food-btn" onClick={addItem}>Add</button>
        ) : (
          <div className="food-item-counter-container">
            <button type="button" testid="decrement-count" className="counter-btn" onClick={decrement}><HiOutlineMinusSm /></button>
            <p testid="active-count" className="counter-value">{count}</p>
            <button type="button" testid="increment-count" className="counter-btn" onClick={increment}><BsPlus /></button>
          </div>
        )}
      </div>
    </li>
  )
}
export default FoodItems
