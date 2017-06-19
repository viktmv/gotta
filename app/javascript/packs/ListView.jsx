import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ListMain from '../list-page/ListMain.jsx'
import Header from '../index/Header.jsx'

class ListView extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user: '',
      listItems: props.data.items,
      listName: props.data.name
    }
  }

  componentWillMount() {
    console.log(this.props)
    console.log(this.props.data.items)
  }

  render() {
    return (
      <div>
        <main><ListMain name={this.state.listName} listItems={this.state.listItems} /></main>
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
  let listData = JSON.parse(document.body.querySelector('#list-data').getAttribute('data'))
  ReactDOM.render(
    <ListView data={listData} />,
    document.body.appendChild(document.createElement('div')),
  )
})
