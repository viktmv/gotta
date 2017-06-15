import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: this.props.listItems
    }
  }
  render() {
    return (<div>{this.state.listItems.map(({itemName, itemDescription, itemLink}) => {
      return (
      <div key={this.generateKey()}>
        <h1>{itemName}</h1>
        <p>Desctiption: {itemDescription}</p>
        <p>Link: {itemLink}</p>
      </div>
        )
    })}</div>)
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default List
