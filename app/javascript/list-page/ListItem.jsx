import React from 'react'


class ListItem extends React.Component {
  render() {
    return (<div className="list-item" key={this.props.data.itemKey}>

              <div className="item-image" style={{backgroundImage: `url(${this.props.data.img})`, width: '72px', height: '72px'}}></div>

              <div className="published-list-text-container">
                <h3 className="published-list-item-title">{this.props.data.name}</h3>
                <div className="published-list-item-body">{this.props.data.description}
                <a href={this.props.data.link}>...more</a></div>
              </div>

            </div>)
  }
}

export default ListItem
