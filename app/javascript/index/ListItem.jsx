import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <b className="list-item-name">Name: {this.props.data.itemName}</b>
              <span className="list-item-description">Description: {this.props.data.itemDescription}</span>
              <span className="list-item-link">Link: {this.props.data.itemLink}</span>
               <FloatingActionButton mini={true} primary={true} className="rm-list-item" onClick={this.props.handleRemoveClick}><ContentRemove /></FloatingActionButton>
            </div>)
  }
}

export default ListItem
