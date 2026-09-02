import {BsFilterLeft} from 'react-icons/bs'
import {sortByOptions} from '../../App'
import './index.css'

const RestaurantsHeader = ({activeOptionId, updateActiveOptionId}) => (
  <div className="restaurants-header">
    <div>
      <h1 className="restaurants-heading">Popular Restaurants</h1>
      <p className="restaurants-subheading">Select your favourite restaurant special dish and make your day happy...</p>
    </div>
    <div className="sort-by-container">
      <BsFilterLeft className="sort-by-icon" />
      <label htmlFor="sortBy" className="sort-by-label">Sort By</label>
      <select id="sortBy" className="sort-by-select" value={activeOptionId} onChange={e => updateActiveOptionId(e.target.value)}>
        <option value={sortByOptions.lowest}>Lowest</option>
        <option value={sortByOptions.highest}>Highest</option>
      </select>
    </div>
  </div>
)
export default RestaurantsHeader
