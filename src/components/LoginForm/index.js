import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', errorMsg: '', isLoginError: false}

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  successView = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  failureView = errorMsg => {
    this.setState({isLoginError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const userCredentials = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }
    const loginResponse = await fetch(loginUrl, options)
    const loginData = await loginResponse.json()
    if (loginResponse.ok) {
      this.successView(loginData.jwt_token)
    } else {
      this.failureView(loginData.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMsg, isLoginError} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <div className="login-form-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-img"
          />
          <form className="form-container" onSubmit={this.onSubmitLoginForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <label className="label" htmlFor="user-id">
              User ID
            </label>
            <input
              className="user-input"
              id="user-id"
              value={userId}
              onChange={this.onChangeUserInput}
              placeholder="Enter User ID"
              type="text"
            />
            <label className="label" htmlFor="password">
              PIN
            </label>
            <input
              className="user-input"
              id="password"
              value={pin}
              onChange={this.onChangePassword}
              placeholder="Enter PIN"
              type="password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {isLoginError ? <p className="error">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
