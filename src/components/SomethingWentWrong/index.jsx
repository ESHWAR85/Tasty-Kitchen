import './index.css'

// Generic API-failure view, reused wherever a fetch call fails
// (restaurants list, restaurant details, offers).
const SomethingWentWrong = ({onRetry}) => (
  <div className="went-wrong-container">
    <img
      src="https://res.cloudinary.com/dqxvc3zbn/image/upload/v1618996985/Group_7522_de3ppb.png"
      alt="something went wrong"
      className="went-wrong-img"
    />
    <h1 className="went-wrong-heading">Oops! Something Went Wrong</h1>
    <p className="went-wrong-description">
      We are having some trouble processing your request. Please try again.
    </p>
    {onRetry && (
      <button type="button" className="retry-btn" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
)

export default SomethingWentWrong
