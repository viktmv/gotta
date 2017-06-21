import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ListMain from '../list-page/ListMain.jsx'
import Header from '../index/Header.jsx'

////// Material UI stuff ////////
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
/////////////////////////////////

class ListView extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user: ''
    }
  }

  componentWillMount() {
    console.log(this.props)
    console.log(this.props.data.items)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <main><div className="wrapper"><ListMain name={this.props.data.name} id={this.props.data.id} listItems={this.props.data.items} /></div></main>
        </div>
      </MuiThemeProvider>
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
  let listData = JSON.parse(document.body.querySelector('#list-data').getAttribute('data'))
  ReactDOM.render(
    <ListView data={listData} />,
    document.body.appendChild(document.createElement('div')),
  )
})
