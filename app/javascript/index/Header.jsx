
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
import LoL from './LoL'

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
                <Route path="/my-lists" component={this.renderLoLWithProps}/>
              </Switch>
            </div>
          </Router>
        </nav>
      </header>
    )
  }

  renderLoginWithProps = () => {
    let {props} = this
    return <Login {...props} />
  }

  renderLoLWithProps = () => {
    let {props} = this
    return <LoL {...props} />
  }
}

export default Header
