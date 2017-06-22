// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../index/Header'
import CreateNewList from '../index/CreateNewList'
import Auth from '../modules/Auth'
import SelectBackground from '../index/SelectBackground'


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
    this.state = {
      published: false
    }
  }

  componentWillMount = () => {
    this.authWithToken()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header user={this.state.user} authWithToken={this.authWithToken} setUser={this.setUser}></Header>
          <main><div className="wrapper"><CreateNewList user={this.state.user} /></div></main>
          <SelectBackground />
        </div>
      </MuiThemeProvider>
    )
  }

  setUser = user => {
    this.setState({user})
  }

  editList = list => {

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
