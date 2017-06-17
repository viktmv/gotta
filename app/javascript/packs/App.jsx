// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../index/Header.jsx'
import CreateNewList from '../index/CreateNewList.jsx'
import Auth from '../modules/Auth'

let _sessionState = {
  authRequestInProgress: false,
  authErrors: [],
  authToken: null,
  username: null,
  userId: null
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount = () => {
    return this.authWithToken()
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} authWithToken={this.authWithToken}></Header>
        <main><CreateNewList user={this.state.user} /></main>
      </div>
    )
  }

  setUser = (user) => {
    this.setState({user})
  }

  authWithToken = () => {
    if (Auth.isUserAuthenticated()) {
      let user = Auth.getUser()
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
