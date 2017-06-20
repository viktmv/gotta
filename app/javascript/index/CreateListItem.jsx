import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 10,
  verticalAlign: -10,
};

class CreateListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemName: '',
      itemDescription: '',
      itemLink: ''
    }
  }
  render () {
    return (
      <div>
        <input type="link" onChange={this.updateLink} placeholder="list-item link" />
        <input type="name" onChange={this.updateName} placeholder="list-item name" />
        <input type="description" onChange={this.updateDescription}placeholder="list-item description" />
        <FloatingActionButton mini={true} style={style} onClick={this.handleAddClick}><ContentAdd /></FloatingActionButton>
      </div>
    )
  }

  handleAddClick = () => {
    let {itemName, itemDescription, itemLink} = this.state
    let key = this.generateKey()
    this.props.addItem({itemName, itemDescription, itemLink, itemKey: key})
  }

  updateName = (e) => {
    this.setState({itemName: e.target.value})
  }

  updateDescription = (e) => {
    this.setState({itemDescription: e.target.value})
  }

  updateLink = (e) => {
    fetch(e.target.value).then(res)
    this.setState({itemLink: e.target.value})
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
