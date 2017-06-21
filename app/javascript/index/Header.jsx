
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
        <nav className="login-register-controls">
         <AppBar title="GOTTA" showMenuIconButton={false}>
          <Router>
            <div>
              <ul>
                <ul className="navItems">
                  <li><LoginDialog {...this.props}>Login</LoginDialog></li>
                  <li>{controls}</li>
                </ul>
              </ul>
              <Switch>
                <Route path="/my-lists" component={this.renderLoLWithProps}/>
              </Switch>
            </div>
          </Router>
         </AppBar>
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
