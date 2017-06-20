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
        <input type="link" onChange={this.updateLink} placeholder="list-item link" />
        <input type="name" onChange={this.updateName} placeholder="list-item name" />
        <input type="description" onChange={this.updateDescription}placeholder="list-item description" />
        <button className="add-list-item" onClick={this.handleAddClick}>+</button>

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

    let meta = document.querySelector('meta[name="csrf-token"]').content

    // let url = JSON.stringify({ url: e.target.value })
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json'})

    let data = {
      url: e.target.value
    }

    let init = {
                 method: 'POST',
                 headers: headers,
                 body: JSON.stringify(data)
               }

    fetch('/connect', init)
    .then(response => {
      console.log(init)
      return response
    }).then(res => {
      // let {user} = res
      console.log(res)
      // if (user) Auth.authenticateUser(user)
      // this.props.setUser(user)

    }).catch(err => console.log(err))
    // fetch(e.target.value).then(res => res.json).then(console.log)
    this.setState({itemLink: e.target.value})
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
