import React from 'react'
import ReactDOM from 'react-dom'

import CreateListItem from './CreateListItem.jsx'
import List from './List.jsx'

class CreateNewList extends React.Component {
  constructor() {
    super()
    this.state = {
      listItems: [1,2,3, 'hey'],
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
        <div id="new-list-creation"> </div>
        <List listItems={this.state.listItems}></List>
      </div>
    )
  }

  handleClick = (e) => {
    this.setState({ btn: { placeholder: 'Enter the list name', type: 'text', value: '' }})
  }

  showCreationForm = (e) => {
    return ReactDOM.render(<CreateListItem></CreateListItem>, document.getElementById('new-list-creation'))
  }

}

export default CreateNewList
