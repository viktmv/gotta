import React from 'react'


class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <h2>{this.props.data.name}</h2>
              <p>{this.props.data.description}</p>
              <p>{this.props.data.link}</p>
            </div>)
  }
}

export default ListItem
