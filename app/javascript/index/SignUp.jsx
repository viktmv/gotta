import React from 'react'


class SignUp extends React.Component {

  render() {
    return (<div className="sign-up-form">
              <h2>Sign-up</h2>
              <form name="user">
                <input name="user[name]" type="text" placeholder="Name" />
                <input name="user[email]" type="email" placeholder="Email" />
                <input name="user[password]" type="password" placeholder="password" />
                <input name="user[password_confirmation]" type="password" placeholder="password confirmation" />
                <button onClick={this.signUpHandler}>Sing-up</button>
              </form>
            </div>)

  }

  signUpHandler(e) {
    e.preventDefault()
    'use strict'
  //  let email = document.querySelector('.sign-up-form input[name=email]').value
  //  let password = document.querySelector('.sign-up-form input[name=password]').value
  //  let password_confirmation = document.querySelector('.sign-up-form input[name=password-confirmation]').value

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

   fetch('/users', init).then(function(response) {
     console.log(init.headers.get('X-CSRF-Token'))
     return response
   }).then(function(myBlob) {
     console.log(myBlob);
   }).catch(err => console.log(err))
  }
}

export default SignUp
