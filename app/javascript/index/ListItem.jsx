import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const style = {
  marginLeft: 10,
  verticalAlign: 30,
  cssFloat: "right",
  marginRight: 30
};

class ListItem extends React.Component {
  render() {
    return (<div id={this.props.data.itemKey} className="list-item" key={this.props.data.itemKey}>
              <div className="item-image" style={{ backgroundImage: `url(${this.props.data.img})`, width: '72px', height: '72px'}}></div>
              <b className="list-item-name">{this.props.data.name}</b><br />
              <span className="list-item-description">{this.props.data.description}<a href={this.props.data.link} className="list-item-link">...More</a></span>
              <FloatingActionButton mini={true} style={style} className="rm-list-item" onClick={this.props.handleRemoveClick}><ContentRemove /></FloatingActionButton>
            </div>)
  }
}

export default ListItem
