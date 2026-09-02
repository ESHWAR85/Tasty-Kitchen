import {useState, useEffect} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const foodSlides = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/dppqkea7f/image/upload/v1625809830/login-image_duk4fw.png',
    title: 'Delicious Food',
    description: 'Enjoy delicious food from your favourite restaurants.',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/dppqkea7f/image/upload/v1625809830/login-image_duk4fw.png',
    title: 'Tasty Meals',
    description: 'Order your favourite meals with just a few clicks.',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/dppqkea7f/image/upload/v1625809830/login-image_duk4fw.png',
    title: 'Food Delivered',
    description: 'Get your favourite food delivered to your doorstep.',
  },
]

const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [activeSlide, setActiveSlide] = useState(0)

  // =========================
  // AUTO SLIDER
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(currentSlide => {
        if (currentSlide === foodSlides.length - 1) {
          return 0
        }

        return currentSlide + 1
      })
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // =========================
  // INPUTS
  // =========================

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  // =========================
  // SUCCESS
  // =========================

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    navigate('/', {replace: true})
  }

  // =========================
  // FAILURE
  // =========================

  const onSubmitFailure = message => {
    setShowSubmitError(true)
    setErrorMsg(message)
  }

  // =========================
  // LOGIN
  // =========================

  const submitForm = async event => {
    event.preventDefault()

    setShowSubmitError(false)

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)

      const data = await response.json()

      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure(
        'Something went wrong. Please try again.',
      )
    }
  }

  // =========================
  // ALREADY LOGIN
  // =========================

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-container">

      {/* =========================
          LOGIN SECTION
      ========================= */}

      <div className="login-card">
        <form
          className="login-form"
          onSubmit={submitForm}
        >
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
            alt="website logo"
            className="login-logo"
          />

          <h1 className="brand-heading">
            Tasty Kitchens
          </h1>

          <h1 className="login-heading">
            Login
          </h1>

          <label
            htmlFor="username"
            className="login-label"
          >
            USERNAME
          </label>

          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="rahul"
            value={username}
            onChange={onChangeUsername}
          />

          <label
            htmlFor="password"
            className="login-label"
          >
            PASSWORD
          </label>

          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="rahul@2021"
            value={password}
            onChange={onChangePassword}
          />

          <button
            type="submit"
            className="login-submit-btn"
          >
            Login
          </button>

          {showSubmitError && (
            <p className="login-error">
              *{errorMsg}
            </p>
          )}
        </form>
      </div>

      {/* =========================
          FOOD SLIDER
      ========================= */}

      <div className="login-image-container">

        <div className="food-slider">

          <div
            className="food-slider-track"
            style={{
              transform: `translateX(-${
                activeSlide * 100
              }%)`,
            }}
          >
            {foodSlides.map(slide => (
              <div
                className="food-slide"
                key={slide.id}
              >
                <img
                  src={slide.image}
                  alt="website login"
                  className="login-image"
                />

                <div className="food-overlay">
                  <h2>{slide.title}</h2>

                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DOTS */}

          <div className="food-dots">
            {foodSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className={
                  index === activeSlide
                    ? 'food-dot food-dot-active'
                    : 'food-dot'
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginForm