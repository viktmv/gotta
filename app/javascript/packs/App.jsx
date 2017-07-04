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
      published: false,
      list: {},
      listItems: [],
      theme: ''
    }
  }

  componentWillMount = () => {
    this.authWithToken()
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header user={this.state.user}
                  authWithToken={this.authWithToken}
                  setUser={this.setUser}
                  handleEdit={this.handleEdit}
                  handleDelete={this.handleDelete}/>
          <main>
            <div className="wrapper">
              <CreateNewList user={this.state.user}
                             list={this.state.list}
                             listItems={this.state.listItems}
                             addItem={this.addItem}
                             rmItem={this.rmItem}
                             handleNameChange={this.handleNameChange} />
            </div>
          </main>
          <SelectBackground addTheme={this.addTheme}/>
        </div>
      </MuiThemeProvider>
    )
  }

  addTheme = theme => {
    this.setState({theme})
    document.querySelector('html').style.background = theme

    if (!this.state.user) return
    let {id} = this.state.user

    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })
    let options = {method: 'POST', headers, body: JSON.stringify({theme})}

    fetch(`/${id}/theme`, options)
    .then(res => res.json())
    .catch(console.warn)
  }

  setUser = user => {
    if (user) this.addTheme(user.theme)
    this.setState({user})
  }

  // Authenticate the user
  authWithToken = () => {
    if (Auth.isUserAuthenticated()) {
      let user = Auth.getUser()
      this.setState({user, theme: user.theme})
      document.querySelector('html').style.background = user.theme
    }
  }

  // Edit the list
  handleEdit = e => {
    let listID =  e.target.closest('.my-list-item').dataset.id

    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })
    let init = {method: 'GET', headers}

    fetch(`/lists/${listID}/edit`, init)
    .then(response => response.json())
    .then(result => this.setState({list: result.list, listItems: result.list_items }))
    .catch(err => console.log(err))
  }

  // Delete the list entirely
  handleDelete = e => {
    let listID =  e.target.closest('.my-list-item').dataset.id

    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })
    let init = {method: 'DELETE', headers, body: JSON.stringify({id: listID})}

    return fetch(`/lists/${listID}/delete`, init)
           .then(response => response.json())
           .then(result => this.setState({list: '', listItems: [] }))
           .catch(err => console.log(err))
  }

  // Add item to the list
  addItem = item => {
    let {listItems} = this.state

    listItems.push(item)
    this.setState({listItems})
  }

  // Remove item from the list
  rmItem = item => {
    let {listItems} = this.state

    listItems.splice(listItems.findIndex(listItem => listItem.itemKey == item.id ), 1)
    this.setState({listItems})
  }

  handleNameChange = e => {
    if (e.key == 'Enter') this.setState({list: {name: e.target.value}})
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
