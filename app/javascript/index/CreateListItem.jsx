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
        <button className="add-list-item btn-floating btn-large waves-effect waves-light red" onClick={this.handleAddClick}>+</button>

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
    this.setState({itemLink: e.target.value})
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
