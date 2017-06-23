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
      listItems: props.listItems || [],
      btn: {
        type: 'submit',
        value: 'Create List'
      },
      clicked: false,
      published: false,
      confirmationPopupOpen: false,
      }
    }

  handleOpen = () => {
    this.setState({confirmationPopupOpen: true});
  };

  handleClose = () => {
    this.setState({confirmationPopupOpen: false});
  };

  ////Fancy button
  render() {

    // Check if a list is already there
    let {list} = this.props
    let listExists = !!Object.keys(list).length

    let input
    // = `<input type=${this.state.btn.type}
    //                    id="start-new-list"
    //                    ${this.state.btn.type == 'submit' //Initially type is submit
    //                    ? `value="${this.state.btn.value}" `
    //                    : `placeholder="${this.state.btn.placeholder}"`}
    //                    />`


    if (this.state.btn.type == 'submit' && !listExists) {
      input = `<input type=${this.state.btn.type} id="start-new-list" value="${this.state.btn.value}" />`
    }
    else if (listExists) {
      input = `<input type="text" id="start-new-list" placeholder="${list.name}" value="" />`
    }
    else {
      input = `<input type=${this.state.btn.type} id="start-new-list" placeholder="${this.state.btn.placeholder}" />`
    }

    let listStructure = ''

    if (this.state.clicked || listExists) {
      listStructure = <div>
              <List name={this.props.listName} rmItem={this.props.rmItem} listItems={this.props.listItems}>
              </List>
              <CreateListItem addItem={this.props.addItem} />
              <RaisedButton label="Publish Your List" primary={true} onClick={this.handleCreate} onTouchTap={this.handleOpen}></RaisedButton>
             </div>
    }

    let popup = this.state.published ? (<ConfirmationPopUp list={this.state.listID}
                confirmationPopupOpen={this.state.confirmationPopupOpen}
                handleClose={this.handleClose} />) : ('')

    return (
      <div id="new-list">
        <span onClick={this.handleClick} onKeyUp={this.props.handleNameChange} dangerouslySetInnerHTML={{__html: input}} />
        {listStructure}
        {popup}
      </div>
    )
  }

  //Fancy button - on click the type turns from submit to text
  handleClick = e => {
    let {list} = this.props
    let placeholder = Object.keys(list).length ? list.name : 'Enter the list name'
    this.setState({ btn: { placeholder, type: 'text', value: '' }, clicked: true})
  }

  publishList = (list) => {
    this.setState({published: true, listID: list.id})
  }

  // handle list creation request
  handleCreate = e => {
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })

    this.setState({confirmationPopupOpen: true});

    let list = {
      name: this.props.list.name,
      items: this.props.listItems,
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

}

export default CreateNewList
