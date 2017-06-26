import React from 'react'
// Material-ui components
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// Auth module
import Auth from '../modules/Auth'

export default class LoginDialog extends React.Component {
  constructor()  {
    super()
    this.state = {
      open: false,
    }
  }

  render() {
    // Material-ui buttons for dialog
    const actions = [
      <div className="error-message login-errors"></div>,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogin}
      />
    ]

    // Dynamic Login-logout btn
    let sessionBtn = this.props.user
                   ? <div className="nav-button" onTouchTap={this.handleLogout}>Logout</div>
                   : <div className="nav-button" onTouchTap={this.handleOpen}>Login</div>
    return (
      <div>
        {sessionBtn}
        <Dialog
          title="Login"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form className="login-form">
            <TextField
              id="text-field-controlled"
              className="login-email"
              name="email"
              type="email"
              floatingLabelText="Email"
            />
            <TextField
              id="text-field-controlled"
              className="login-password"
              name="password"
              type="password"
              floatingLabelText="Password"
            />
          </form>
        </Dialog>
      </div>
    )
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleLogin = e => {
    e.preventDefault()

    let inputsCheck = this.validateInputs()
    let errMsg = document.querySelector('.error-message.login-errors')
    if (!inputsCheck.valid) return errMsg.textContent = inputsCheck.error
    errMsg.textContent = ''

    let form = document.querySelector('.login-form')
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let data = new FormData(form)
    let headers = new Headers({'X-CSRF-Token': meta})

    let init = {
      method: 'POST',
      headers: headers,
      body: data
    }

    fetch('/login', init).then(response => {
      return response.json()
    }).then(res => {
      let {user} = res
      if (user) {
        Auth.authenticateUser(user)
        this.handleClose()
      }
      this.props.setUser(user)
    }).catch(err => console.log(err))
  }

  handleLogout = () => {
    if (this.props.user) {
       Auth.deauthenticateUser()
       return this.props.setUser(null)
     }
  }

  validateInputs = () => {
    const $ = el => document.querySelector(el)

    let email = $('.login-email input').value
      , password = $('.login-password input').value

    let validationResult = {valid: false, error: ''}
    if (!email || !password) {
      validationResult.error = 'Please fill in all the fields'
      return validationResult
    }
    validationResult.valid = true
    return validationResult
  }
}
