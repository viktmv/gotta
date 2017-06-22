import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Auth from '../modules/Auth'
import TextField from 'material-ui/TextField'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
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
      />,
    ];

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
              name="email"
              type="email"
              floatingLabelText="Email"
            />
            <TextField
              id="text-field-controlled"
              name="password"
              type="password"
              floatingLabelText="Password"
            />
          </form>
        </Dialog>
      </div>
    );
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.props.user) {
      Auth.deauthenticateUser()
      return this.props.setUser(null)
    }

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
      console.log(user)
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
}
