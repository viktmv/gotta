import React from 'react'
import ListItem from './ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class List extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className="new-list-name-container">
              <h2 className="new-list-name">{this.props.name}</h2>
              {this.props.listItems.map((item, i) => <ListItem key={i}
                                                              data={item}
                                                              handleRemoveClick={this.handleRemoveClick}/>)}
            </div>)
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.closest('.list-item'))
  }
}

export default List
