import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import SomethingWentWrong from '../SomethingWentWrong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const RestaurantDetails = () => {
  const {id} = useParams()
  const [restaurantData, setRestaurantData] = useState({})
  const [foodItemsList, setFoodItemsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getRestaurantDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedFoodItems = data.food_items.map(item => ({
          id: item.id,
          name: item.name,
          cost: item.cost,
          imageUrl: item.image_url,
          rating: item.rating,
        }))
        setRestaurantData({
          id: data.id,
          name: data.name,
          cuisine: data.cuisine,
          imageUrl: data.image_url,
          location: data.location,
          rating: data.rating,
          reviewsCount: data.reviews_count,
          costForTwo: data.cost_for_two,
        })
        setFoodItemsList(updatedFoodItems)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getRestaurantDetails()
  }, [getRestaurantDetails])

  const renderLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Oval visible height={40} width={50} color="gold" ariaLabel="loading" />
    </div>
  )

  const renderSuccessView = () => (
    <>
      <div className="restaurant-info-container">
        <img
          src={restaurantData.imageUrl}
          alt="restaurant"
          className="restaurant-details-img"
        />
        <div className="restaurant-info-text">
          <h1 className="restaurant-details-name">{restaurantData.name}</h1>
          <p className="restaurant-details-cuisine">
            {restaurantData.cuisine}
          </p>
          <p className="restaurant-details-location">
            {restaurantData.location}
          </p>
          <div className="restaurant-details-meta">
            <div className="meta-block">
              <div className="meta-row">
                <FaStar className="star-icon" />
                <p className="meta-value">{restaurantData.rating}</p>
              </div>
              <p className="meta-label">
                {restaurantData.reviewsCount} Ratings
              </p>
            </div>
            <div className="meta-block">
              <div className="meta-row">
                <FaRupeeSign className="rupee-icon" />
                <p className="meta-value">{restaurantData.costForTwo}</p>
              </div>
              <p className="meta-label">Cost for two</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="food-items-list">
        {foodItemsList.map(foodItem => (
          <FoodItems foodItem={foodItem} key={foodItem.id} />
        ))}
      </ul>
    </>
  )

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return <SomethingWentWrong onRetry={getRestaurantDetails} />
      default:
        return null
    }
  }

  return (
    <div className="restaurant-details-page">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  )
}

export default RestaurantDetails
