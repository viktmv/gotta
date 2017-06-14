import React from 'react'

class CreateListItem extends React.Component {
  render () {
    return (
      <div>
        <input type="name" placeholder="list name" />

        <input type="name" placeholder="list-item name" />
        <input type="description" placeholder="list-item description" />
        <input type="link" placeholder="list-item link" />
        <button className="add-list-item">+</button>
      </div>
    )
  }

}

export default CreateListItem
