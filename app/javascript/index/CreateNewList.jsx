import React from 'react'
import ReactDOM from 'react-dom'

import CreateListItem from './CreateListItem.jsx'
import List from './List.jsx'
import ConfirmationPopUp from '../index/ConfirmationPopUp'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class CreateNewList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      listName: '',
      listItems: [{itemName: 'Your first thing to add',
                  itemLink: 'exapmle.com',
                  itemDescription: 'Something you wanna get back to',
                  itemKey: 'example-item'
                }],
      btn: {
        type: 'submit',
        value: 'Create List'
      },
      clicked: false,
      published: false,
      confirmationPopupOpen: false,
      };
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
    }

handleOpen = () => {
  this.setState({confirmationPopupOpen: true});
};

handleClose = () => {
  this.setState({confirmationPopupOpen: false});
};

////Fancy button
  render() {
    let input = `<input type=${this.state.btn.type}
                       id="start-new-list"
                       ${this.state.btn.type == 'submit' //Initially type is submit
                       ? `value="${this.state.btn.value}" `
                       : `placeholder="${this.state.btn.placeholder}"`}
                       />`

    let list = ''
    if (this.state.clicked) {
      list = <div>
              <List name={this.state.listName} rmItem={this.rmItem} listItems={this.state.listItems}>
              </List>
              <CreateListItem addItem={this.addItem} />
             </div>
    }

    let popup = this.state.published ? (<ConfirmationPopUp list={this.state.listID}
                confirmationPopupOpen={this.state.confirmationPopupOpen}
                handleClose={this.handleClose} />) : ('')

    return (
      <div id="new-list">
        <span onClick={this.handleClick} onKeyUp={this.handleEnter} dangerouslySetInnerHTML={{__html: input}} />
        {list}
        <br></br>
        <RaisedButton label="Publish Your List" primary={true} onClick={this.handleCreate} onTouchTap={this.handleOpen}></RaisedButton>
        {popup}
      </div>
    )
  }

  //Fancy button - on click the type turns from submit to text
  handleClick = e => {
    this.setState({ btn: { placeholder: 'Enter the list name', type: 'text', value: '' }, clicked: true})
  }

  handleEnter = e => {
    if (e.key == 'Enter') this.setState({listName: e.target.value})
  }

  publishList = (list) => {
    this.setState({published: true, listID: list.id})
  }

  handleCreate = e => {
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })

    this.setState({confirmationPopupOpen: true});

    let list = {
      name: this.state.listName,
      items: this.state.listItems,
      user: this.props.user
    }

    // Options for request
    let init = {
                 method: 'POST',
                 headers: headers,
                 body: JSON.stringify(list)
               }

    // Post the creation request
    fetch('/lists/create', init).then(response => {
      return response.json()
    }).then(result => {
      this.publishList(result)
    })
    .catch(err => console.log(err))



  }

  addItem = item => {
    let {listItems} = this.state

    listItems.push(item)
    this.setState({listItems})
  }

  rmItem = item => {
    let {listItems} = this.state

    listItems.splice(listItems.findIndex(listItem => listItem.itemKey == item.id ), 1)
    this.setState({listItems})
  }
}

export default CreateNewList
