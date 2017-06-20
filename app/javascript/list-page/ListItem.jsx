import React from 'react'


class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>
              <h2>{this.props.data.name}</h2>
              <div className="item-image" style={{backgroundImage: `url(${this.props.data.img})`, width: '72px', height: '72px'}}></div>
              <p>{this.props.data.description}</p>
              <a href={this.props.data.link} className="list-item-link">Link</a>
            </div>)
  }
}

export default ListItem
