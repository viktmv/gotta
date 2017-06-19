import React from 'react'
import ListItem from './ListItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: this.props.listItems
    }
  }
  render() {
    return (<div>
              <h2>{this.props.name}</h2>
              {this.state.listItems.map((item, i)=> <ListItem key={i}
                                                              data={item}
                                                              handleRemoveClick={this.handleRemoveClick}/>)}
            </div>)
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.parentNode)
  }
}

export default List
