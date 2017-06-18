
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import SignUp from './SignUp'
import Login from './Login'

const LoL = () => (
  <div>
    <h2>My lists</h2>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
    </ul>
  </div>
)

class Header extends React.Component {
  render() {

    let loggedIn = this.props.user ? true : false
    let link = ''
      , text = ''

    if (loggedIn) {
      text = 'Logout'
      link = <Link to="/my-lists" className="my-lists-link">My Lists</Link>
    }
    else {
      text = 'Login'
      link = <Link to="/sign-up" className="singup-link">Sign Up</Link>
    }

    return (
      <header className="main-header">
        <div className="logo">Logo</div>
        <nav className="login-register-controls">
        <div className="brand-logo">Logo</div>
          <Router>
            <div>
              <ul>
                <ul>
                  <li><Link to="/login" className="login-link">{text}</Link></li>
                  <li>{link}</li>
                </ul>
              </ul>
              <Switch>
                <Route exact path="/login" render={this.renderLoginWithProps}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/my-lists" component={LoL}/>
              </Switch>
            </div>
          </Router>
        </nav>
      </header>
    )
  }

  renderLoginWithProps = () => {
    let props = this.props
    return <Login {...props} />
  }
}

export default Header
