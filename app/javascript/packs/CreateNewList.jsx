import React from 'react'
import ReactDOM from 'react-dom'

import CreateListItem from './CreateListItem.jsx'
import List from './List.jsx'

class CreateNewList extends React.Component {
  constructor() {
    super()
    this.state = {
      listItems: [{itemName: 'item1', itemLink: 'exapmle.com', itemDescription: 'Some Item'}],
      btn: {
        type: 'submit',
        value: 'Create List'
      }
    }
  }

  render() {
    let input = `<input type=${this.state.btn.type}
                       className="start-new-list"
                       ${this.state.btn.type == 'submit'
                       ? `value="${this.state.btn.value}" `
                       : `placeholder="${this.state.btn.placeholder}"`}
                       />`

    return (
      <div id="new-list">
        <span onClick={this.handleClick} dangerouslySetInnerHTML={{__html: input}} />
        <List listItems={this.state.listItems}></List>
        <div id="new-list-creation"></div>
      </div>
    )
  }

  handleClick = (e) => {
    this.showCreationForm(e)
    this.setState({ btn: { placeholder: 'Enter the list name', type: 'text', value: '' }})
  }

  showCreationForm = (e) => {
    return ReactDOM.render(<CreateListItem addItem={this.addItem}></CreateListItem>, document.getElementById('new-list-creation'))
  }

  addItem = (item) => {
    let {listItems} = this.state

    listItems.push(item)
    this.setState({listItems})
  }
}

export default CreateNewList
