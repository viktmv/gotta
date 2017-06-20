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
  constructor() {
    super()
    this.state = {
      listItems: [{itemName: 'Your first thing to add',
                  itemLink: 'exapmle.com',
                  itemDescription: 'Something you wanna get back to',
                  itemKey: 'example-item'
                },
                {itemName: 'Your first thing to add',
                            itemLink: 'example.com',
                            itemDescription: 'Something you wanna get back to',
                            itemKey: 'example-item2'
                }],
      listName: 'Test List #1'
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header></Header>
          <main><div className="wrapper"><ListMain name={this.state.listName} listItems={this.state.listItems} /></div></main>
        </div>
      </MuiThemeProvider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ListView />,
    document.body.appendChild(document.createElement('div')),
  )
})
