import React from 'react'
import Auth from '../modules/Auth'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class LoginDialog extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const actions = [
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
        <RaisedButton label="SignUp" onTouchTap={this.handleOpen} />
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
              id="text-field-controlled"
              name="user[name]"
              type="text"
              floatingLabelText="Your name"
            />
            <TextField
              id="text-field-controlled"
              name="user[email]"
              type="email"
              floatingLabelText="Email"
            />
            <TextField
              id="text-field-controlled"
              name="user[password]"
              type="password"
              floatingLabelText="Password"
            />
            <TextField
              id="text-field-controlled"
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

  signUpHandler = e => {
    e.preventDefault()

    console.log(this)
    let form = document.querySelector('.sign-up-form form')
    let meta = document.querySelector('meta[name="csrf-token"]').content

    let data = new FormData(form)

    let headers = new Headers({'X-CSRF-Token': meta})
    console.log('headers:', headers.get('X-CSRF-Token'))

    let init = {
                method: 'POST',
                headers: headers,
                body: data
              }

    fetch('/users', init).then(response => {
     return response.json()
   }).then(user => {
     if (user) {
       Auth.authenticateUser(user)
       this.handleClose()
     }
     this.props.setUser(user)
    }).catch(err => console.log(err))
  }
}
