import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const style = {
  marginLeft: 10,
  verticalAlign: -10,
};

class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <b className="list-item-name">Name: {this.props.data.itemName}</b>
              <span className="list-item-description">Description: {this.props.data.itemDescription}</span>
              <span className="list-item-link">Link: {this.props.data.itemLink}</span>
               <FloatingActionButton mini={true} style={style} className="rm-list-item" onClick={this.props.handleRemoveClick}><ContentRemove /></FloatingActionButton>
            </div>)
  }
}

export default ListItem
