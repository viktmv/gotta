import React from 'react'


class ListItem extends React.Component {
  render() {
    return (<div key={this.props.data.itemKey}>
              <h5>1{this.props.data.itemName}</h5>
              <p>{this.props.data.itemDescription}</p>
              <p>{this.props.data.itemLink}</p>
            </div>)
  }
}

export default ListItem
