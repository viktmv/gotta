// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../index/Header.jsx'
import CreateNewList from '../index/CreateNewList.jsx'
import Auth from '../modules/Auth'

///// Material UI stuff ////////
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
/////////////////////////////////


  class App extends React.Component {
    constructor() {
      super()
      this.state = {}
    }

    componentWillMount = () => {
      this.authWithToken()
    }

    render() {
      return (
        <MuiThemeProvider>
        <div>
          <Header user={this.state.user} authWithToken={this.authWithToken} setUser={this.setUser}></Header>
          <main><CreateNewList user={this.state.user} /></main>
        </div>
        </MuiThemeProvider>
      )
    }

    setUser = (user) => {
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