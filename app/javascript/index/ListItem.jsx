import React from 'react'

class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <b className="list-item-name">Name: {this.props.data.itemName}</b>
              <span className="list-item-description">Description: {this.props.data.itemDescription}</span>
              <a href={this.props.data.itemLink} className="list-item-link">Link</a>
               <button className="rm-list-item" onClick={this.props.handleRemoveClick}>-</button>
            </div>)
  }
}

export default ListItem
