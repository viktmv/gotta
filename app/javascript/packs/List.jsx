import React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: this.props.listItems
    }
  }
  render() {
    return (<div><h2>{this.props.name}</h2>
              {this.state.listItems.map(({itemName, itemDescription, itemLink, itemKey}) => {
                return (
                <div key={itemKey} id={itemKey}>
                  <b>{itemName}</b>&nbsp;/&nbsp;
                  <span>Description: {itemDescription}</span>&nbsp;/&nbsp;
                  <span>Link: {itemLink}</span>&nbsp;&nbsp;
                  <button className="rm-list-item" onClick={this.handleRemoveClick}>-</button>
                </div>
                  )
              })}
            </div>)
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.parentNode)
  }
}

export default List
