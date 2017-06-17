import React from 'react'

class Login extends React.Component {

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form className="login-form">
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="password" />
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </div>
    )
  }

  handleLogin(e) {
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

    fetch('/login', init).then(function(response) {
      return response.json()
    }).then(function(res) {
      console.log(res.user)
    }).catch(err => console.log(err))
  }
}

export default Login
