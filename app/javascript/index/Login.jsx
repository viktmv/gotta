import React from 'react'
import Auth from '../modules/Auth'

class Login extends React.Component {
  constructor(props) {
    super(props)

  }

  componentWillMount = () => {
    // console.log(this.props)
    // return this.props.authWithToken()
  }

  render() {
    let loggedIn = this.props.user ? true : false
    let loginInputs = ''
      , text = ''

    if (loggedIn) {
      text = 'Logout'
    }
    else {
      text = 'Login'
      loginInputs = <span>
                      <input name="email" type="email" placeholder="Email" />
                      <input name="password" type="password" placeholder="password" />
                    </span>
    }
    return (
      <div>
        <h2>{text}</h2>
        <form className="login-form">
          {loginInputs}
          <button onClick={this.handleLogin}>{text}</button>
        </form>
      </div>
    )
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
      if (user) Auth.authenticateUser(user)
      this.props.setUser(user)

    }).catch(err => console.log(err))
  }
}

export default Login
