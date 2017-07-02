import React from 'react'
import Auth from '../modules/Auth'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

export default class LoginDialog extends React.Component {
  state = {
    open: false,
    errorText: ''
  }


  render() {
    const actions = [
      <div className="error-message signup-errors"></div>,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.signUpHandler}
      />,
    ]

    return (
      <div>
        <div className="nav-button" onTouchTap={this.handleOpen}>Sign up</div>
        <Dialog
          title="Sign Up"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <div className="sign-up-form">
          <form name="user">
            <TextField
              errorText={this.state.errorText}
              onFocus={this.resetErrorText}
              id="text-field-controlled"
              className="signup-name"
              name="user[name]"
              type="text"
              floatingLabelText="Your name"
            />
            <TextField
              id="text-field-controlled"
              className="signup-email"
              name="user[email]"
              type="email"
              floatingLabelText="Email"
            />
            <TextField
              id="text-field-controlled"
              className="signup-password"
              name="user[password]"
              type="password"
              floatingLabelText="Password"
            />
            <TextField
              id="text-field-controlled"
              className="signup-password-confirm"
              name="user[password_confirmation]"
              type="password"
              floatingLabelText="Password Confirmation"
            />
          </form>
        </div>
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

  resetErrorText = () => {
    this.setState({errorText: ''})
  }

  signUpHandler = e => {
    e.preventDefault()

    let inputsCheck = this.validateInputs()
    let errMsg = document.querySelector('.error-message.signup-errors')
    if (!inputsCheck.valid) return errMsg.textContent = inputsCheck.error

    errMsg.textContent = ''

    let form = document.querySelector('.sign-up-form form')
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let data = new FormData(form)
    let headers = new Headers({'X-CSRF-Token': meta})

    let init = {
                method: 'POST',
                headers: headers,
                body: data
              }

    fetch('/users', init)
    .then(response => response.json())
    .then(user => {
     if (user) {
       Auth.authenticateUser(user)
       this.handleClose()
     }
     this.props.setUser(user)
     }).catch(err => console.warn(err))
  }

  validateInputs = () => {
    const $ = el => document.querySelector(el)

    let name = $('.signup-name input').value
      , email = $('.signup-email input').value
      , password = $('.signup-password input').value
      , passwordConfirmation = $('.signup-password-confirm input').value

    let validationResult = {valid: false, error: ''}

    if (!name || !email || !password || !passwordConfirmation) {
      validationResult.error = 'Please fill in all the fields'
      return validationResult
    }
    if (password != passwordConfirmation) {
      validationResult.error = 'Password and Password Confirmation should match'
      return validationResult
    }
    if (password.length < 8 ) {
      validationResult.error = 'Password should be at least 8 characters long'
      return validationResult
    }

    validationResult.valid = true
    return validationResult
  }
}
