
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Login = () => (
  <div>
    <h2>Login</h2>
    <input name="email" type="email" placeholder="Email" />
    <input name="password" type="password" placeholder="password" />
    <button>Login</button>
  </div>
)

const SignUp = () => (
  <div>
    <h2>Sign-up</h2>
    <input name="email" type="email" placeholder="Email" />
    <input name="password" type="password" placeholder="password" />
    <input name="password-confirmation" type="password" placeholder="password" />
    <button>Sing- up</button>
  </div>
)

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
    return (
      <header className="main-header">
        <nav className="login-register-controls">
          <div className="brand-logo">Logo</div>
            <Router>
              <div>
                <ul>
                  <ul>
                    <li><Link to="/login" className="login-link">Login</Link></li>
                    <li><Link to="/sign-up" className="singup-link">Sign Up</Link></li>
                    <li><Link to="/my-lists" className="my-lists-link">My Lists</Link></li>
                  </ul>
                </ul>
                <Route exact path="/login" component={Login}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/my-lists" component={LoL}/>
              </div>
            </Router>
        </nav>
      </header>
    )
  }
}

export default Header
