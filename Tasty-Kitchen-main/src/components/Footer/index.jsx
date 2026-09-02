import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-brand-container">
      <img
        src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png"
        alt="website-footer-logo"
        className="footer-logo-img"
      />
      <h1 className="footer-brand-heading">Tasty Kitchen</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-social-icons-container">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="footer-social-icon"
      />
      <FaInstagram
        testid="instagram-social-icon"
        className="footer-social-icon"
      />
      <FaTwitter testid="twitter-social-icon" className="footer-social-icon" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="footer-social-icon"
      />
    </div>
  </div>
)

export default Footer
