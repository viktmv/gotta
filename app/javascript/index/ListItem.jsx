import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'

const style = {
  // width: 30,
  // height: 30,
}

class ListItem extends React.Component {
  render() {
    return (<div id={this.props.data.itemKey} className="list-item" key={this.props.data.itemKey}>

      <div className="image-container">
        <div className="item-image" style={{ backgroundImage: `url(${this.props.data.img})`, width: '72px', height: '72px'}}></div>
      </div>

      <div className="list-body-container">
        <b className="list-item-name">{this.props.data.name}</b><br />
        <span className="list-item-description">{this.props.data.description}<a href={this.props.data.link} className="list-item-link">
                ...More</a></span>
      </div>

      <div className="list-button-container">
        <FloatingActionButton mini={true} className="rm-list-item" onClick={this.props.handleRemoveClick}><ContentRemove /></FloatingActionButton>
      </div>

    </div>)
  }
}

export default ListItem
