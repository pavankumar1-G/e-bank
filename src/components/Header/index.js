import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="home-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <button type="button" onClick={onClickLogout} className="logout-button">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
