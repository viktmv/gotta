
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import LoL from './LoL'
import LoginDialog from './LoginDialog'
import SignUpDialog from './SignUpDialog'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
  render() {

    let controls = this.props.user
                ? <LoL {...this.props} />
                : <SignUpDialog {...this.props}>SignUp</SignUpDialog>

    return (
      <header className="main-header">
        <div id="brand-logo"><h1>GOTTA</h1></div>
          <Router>
            <nav className="login-register-controls">
                <ul className="navItems">
                  <li><LoginDialog {...this.props}>Login</LoginDialog></li>
                  <li>{controls}</li>
                </ul>
            </nav>
          </Router>
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
