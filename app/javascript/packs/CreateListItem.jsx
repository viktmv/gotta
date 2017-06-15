import React from 'react'

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
        <input type="name" onChange={this.updateName} placeholder="list-item name" />
        <input type="description" onChange={this.updateDescription}placeholder="list-item description" />
        <input type="link" onChange={this.updateLink} placeholder="list-item link" />
        <button className="add-list-item" onClick={this.handleAddClick}>+</button>
      </div>
    )
  }

  handleAddClick = () => {
    let {itemName, itemDescription, itemLink} = this.state
    this.props.addItem({itemName, itemDescription, itemLink})
  }

  updateName = (e) => {
    this.setState({itemName: e.target.value})
  }

  updateDescription = (e) => {
    this.setState({itemDescription: e.target.value})
  }

  updateLink = (e) => {
    this.setState({itemLink: e.target.value})
  }
}

export default CreateListItem
