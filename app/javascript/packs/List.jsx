import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: this.props.listItems
    }
  }
  render() {
    return (<div>{this.state.listItems.map(item => {
      return (<h1 key={this.generateKey()}>{item}</h1> )
    })}</div>)
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default List
