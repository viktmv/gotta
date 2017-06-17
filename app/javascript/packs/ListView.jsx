import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ListMain from '../list-page/ListMain.jsx'
import Header from '../index/Header.jsx'

class ListView extends React.Component {
  constructor() {
    super()
    this.state = {
      listItems: [{itemName: 'Your first thing to add',
                  itemLink: 'exapmle.com',
                  itemDescription: 'Something you wanna get back to',
                  itemKey: 'example-item'
                },
                {itemName: 'Your first thing to add',
                            itemLink: 'exapmle.com',
                            itemDescription: 'Something you wanna get back to',
                            itemKey: 'example-item2'
                }],
      listName: 'Test List #1'
    }
  }

  render() {
    return (
      <div>
        <Header></Header>
        <main><ListMain name={this.state.listName} listItems={this.state.listItems} /></main>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListView />,
    document.body.appendChild(document.createElement('div')),
  )
})
