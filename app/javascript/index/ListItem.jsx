import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <b className="list-item-name">Name: {this.props.data.itemName}</b>
              <span className="list-item-description">Description: {this.props.data.itemDescription}</span>
              <span className="list-item-link">Link: {this.props.data.itemLink}</span>
               <RaisedButton label="-" primary={true} className="rm-list-item" onClick={this.props.handleRemoveClick}></RaisedButton>
            </div>)
  }
}

export default ListItem
