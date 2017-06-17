import React from 'react'
import Auth from '../modules/Auth'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.user
    }
  }

  componentWillMount = () => {
    console.log(this.props)
    return this.props.authWithToken()
  }

  render() {
    let text = this.state.user.auth_token ? 'Logout' : 'Login'

    return (
      <div>
        <h2>Login</h2>
        <form className="login-form">
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="password" />
          <button onClick={this.handleLogin}>{text}</button>
        </form>
      </div>
    )
  }

  handleLogin = e => {
    e.preventDefault()

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
      Auth.authenticateUser(user)
      this.setState({user})
    }).catch(err => console.log(err))
  }
}

export default Login
