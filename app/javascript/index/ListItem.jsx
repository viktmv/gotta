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
    return (<div id={this.props.data.itemKey} className="list-item" key={this.props.data.itemKey}>
              <div className="item-image" style={{ backgroundImage: `url(${this.props.data.itemImage})`, width: '72px', height: '72px'}}></div>
              <b className="list-item-name">Name: {this.props.data.itemName}</b><br />
              <span className="list-item-description">Description: {this.props.data.itemDescription}</span><br />
              <a href={this.props.data.itemLink} className="list-item-link">Link</a>
               <FloatingActionButton mini={true} style={style} className="rm-list-item" onClick={this.props.handleRemoveClick}><ContentRemove /></FloatingActionButton>
            </div>)
  }
}

export default ListItem
