// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../index/Header'
import CreateNewList from '../index/CreateNewList'
import Auth from '../modules/Auth'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      published: false
    }
  }

  componentWillMount = () => {
    this.authWithToken()
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} authWithToken={this.authWithToken} setUser={this.setUser}></Header>
        <main><CreateNewList user={this.state.user} /></main>
      </div>
    )
  }

  setUser = user => {
    this.setState({user})
  }


  authWithToken = () => {
    console.log(Auth.isUserAuthenticated())
    if (Auth.isUserAuthenticated()) {
      let user = Auth.getUser()
      console.log(user)
      this.setState({user})
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
