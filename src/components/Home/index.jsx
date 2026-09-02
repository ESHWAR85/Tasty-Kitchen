import {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {FaStar, FaChevronLeft, FaChevronRight} from 'react-icons/fa'

import {sortByOptions} from '../../App'
import Header from '../Header'
import RestaurantsHeader from '../RestaurantsHeader'
import Footer from '../Footer'
import SomethingWentWrong from '../SomethingWentWrong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const LIMIT = 9
const TOTAL_PAGES = 4
const OFFER_AUTOPLAY_MS = 3500

const Home = () => {
  const [offersList, setOffersList] = useState([])
  const [offersStatus, setOffersStatus] = useState(apiStatusConstants.initial)
  const [offerIndex, setOfferIndex] = useState(0)

  const [restaurantsList, setRestaurantsList] = useState([])
  const [restaurantsStatus, setRestaurantsStatus] = useState(
    apiStatusConstants.initial,
  )

  const [activePage, setActivePage] = useState(1)
  const [activeOptionId, setActiveOptionId] = useState(sortByOptions.lowest)

  // =========================
  // GET OFFERS
  // =========================
  useEffect(() => {
    const getOffers = async () => {
      setOffersStatus(apiStatusConstants.inProgress)

      const jwtToken = Cookies.get('jwt_token')

      try {
        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          const updatedOffers = data.offers.map(offer => ({
            id: offer.id,
            imageUrl: offer.image_url,
          }))

          setOffersList(updatedOffers)
          setOffersStatus(apiStatusConstants.success)
        } else {
          setOffersStatus(apiStatusConstants.failure)
        }
      } catch (error) {
        setOffersStatus(apiStatusConstants.failure)
      }
    }

    getOffers()
  }, [])

  // =========================
  // OFFER AUTO PLAY
  // =========================
  useEffect(() => {
    if (offersList.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setOfferIndex(currentIndex => {
        if (currentIndex === offersList.length - 1) {
          return 0
        }

        return currentIndex + 1
      })
    }, OFFER_AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [offersList])

  // =========================
  // GET RESTAURANTS
  // =========================
  const getRestaurantsList = useCallback(async () => {
    setRestaurantsStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const offset = (activePage - 1) * LIMIT

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOptionId}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        const updatedRestaurants = data.restaurants.map(restaurant => ({
          id: restaurant.id,
          name: restaurant.name,
          imageUrl: restaurant.image_url,
          cuisine: restaurant.cuisine,
          rating: restaurant.user_rating.rating,
          totalReviews: restaurant.user_rating.total_reviews,
        }))

        setRestaurantsList(updatedRestaurants)
        setRestaurantsStatus(apiStatusConstants.success)
      } else {
        setRestaurantsStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setRestaurantsStatus(apiStatusConstants.failure)
    }
  }, [activePage, activeOptionId])

  useEffect(() => {
    getRestaurantsList()
  }, [getRestaurantsList])

  // =========================
  // SORT
  // =========================
  const updateActiveOptionId = value => {
    setActiveOptionId(value)
    setActivePage(1)
  }

  // =========================
  // PAGINATION
  // =========================
  const onClickLeftPage = () => {
    setActivePage(currentPage => Math.max(currentPage - 1, 1))
  }

  const onClickRightPage = () => {
    setActivePage(currentPage =>
      Math.min(currentPage + 1, TOTAL_PAGES),
    )
  }

  // =========================
  // OFFER PREVIOUS
  // =========================
  const onClickPreviousOffer = () => {
    setOfferIndex(currentIndex => {
      if (currentIndex === 0) {
        return offersList.length - 1
      }

      return currentIndex - 1
    })
  }

  // =========================
  // OFFER NEXT
  // =========================
  const onClickNextOffer = () => {
    setOfferIndex(currentIndex => {
      if (currentIndex === offersList.length - 1) {
        return 0
      }

      return currentIndex + 1
    })
  }

  // =========================
  // RENDER OFFERS
  // =========================
  const renderOffers = () => {
    if (offersStatus === apiStatusConstants.inProgress) {
      return (
        <div
          className="loader-container"
          testid="restaurants-offers-loader"
        >
          <Oval
            visible
            height={40}
            width={50}
            color="gold"
            ariaLabel="loading"
          />
        </div>
      )
    }

    if (offersStatus !== apiStatusConstants.success) {
      return null
    }

    return (
      <div className="offers-carousel-container">
        <ul
          className="offers-list"
          style={{
            transform: `translateX(-${offerIndex * 100}%)`,
          }}
        >
          {offersList.map(offer => (
            <li className="offer-slide" key={offer.id}>
              <img
                src={offer.imageUrl}
                alt="offer"
                className="offer-img"
              />
            </li>
          ))}
        </ul>

        {offersList.length > 1 && (
          <>
            <button
              type="button"
              className="offer-nav-btn offer-nav-prev"
              onClick={onClickPreviousOffer}
              aria-label="previous offer"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              className="offer-nav-btn offer-nav-next"
              onClick={onClickNextOffer}
              aria-label="next offer"
            >
              <FaChevronRight />
            </button>

            <div className="offer-dots-container">
              {offersList.map((offer, index) => (
                <button
                  type="button"
                  key={offer.id}
                  aria-label={`offer ${index + 1}`}
                  className={
                    index === offerIndex
                      ? 'offer-dot offer-dot-active'
                      : 'offer-dot'
                  }
                  onClick={() => setOfferIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // =========================
  // RENDER RESTAURANTS LIST
  // =========================
  const renderRestaurantsList = () => (
    <>
      <RestaurantsHeader
        activeOptionId={activeOptionId}
        updateActiveOptionId={updateActiveOptionId}
      />

      <div className="restaurants-list-container">
        <ul className="restaurants-items-container">
          {restaurantsList.map(restaurant => (
            <li key={restaurant.id}>
              <Link
                to={`/restaurant/${restaurant.id}`}
                className="restaurant-item-link"
              >
                <div
                  className="restaurant-item-container"
                  testid="restaurant-item"
                >
                  <img
                    src={restaurant.imageUrl}
                    alt="restaurant"
                    className="restaurant-item-img"
                  />

                  <h1 className="restaurant-item-name">
                    {restaurant.name}
                  </h1>

                  <p className="restaurant-item-cuisine">
                    {restaurant.cuisine}
                  </p>

                  <div className="restaurant-item-rating-container">
                    <FaStar className="star-icon" />

                    <p className="rating-value">
                      {restaurant.rating}
                    </p>
                  </div>

                  <h3 className="restaurant-item-reviews">
                    {restaurant.totalReviews}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pagination-container">
          <button
            type="button"
            testid="pagination-left-button"
            className="pagination-btn"
            onClick={onClickLeftPage}
          >
            <FaChevronLeft />
          </button>

          <p className="page-count-text">
            <span testid="active-page-number">
              {activePage}
            </span>{' '}
            of {TOTAL_PAGES}
          </p>

          <button
            type="button"
            testid="pagination-right-button"
            className="pagination-btn"
            onClick={onClickRightPage}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  )

  // =========================
  // RENDER RESTAURANTS
  // =========================
  const renderRestaurants = () => {
    if (restaurantsStatus === apiStatusConstants.inProgress) {
      return (
        <div
          className="loader-container"
          testid="restaurants-list-loader"
        >
          <Oval
            visible
            height={40}
            width={50}
            color="gold"
            ariaLabel="loading"
          />
        </div>
      )
    }

    if (restaurantsStatus === apiStatusConstants.success) {
      return renderRestaurantsList()
    }

    if (restaurantsStatus === apiStatusConstants.failure) {
      return <SomethingWentWrong onRetry={getRestaurantsList} />
    }

    return null
  }

  return (
    <div className="home-container">
      <Header />

      {renderOffers()}

      {renderRestaurants()}

      <Footer />
    </div>
  )
}

export default Home