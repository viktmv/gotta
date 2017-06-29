import React from 'react'
import ReactDOM from 'react-dom'
// Components
import CreateListItem from './CreateListItem.jsx'
import List from './List.jsx'
// Material-ui components
import ConfirmationPopUp from '../index/ConfirmationPopUp'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

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
      snackOpen: false,
      publishError: ''
    }
  }

  render() {
    // Check if a list is already there
    let {list} = this.props
    let listExists = !!Object.keys(list).length

    // Render various inputs depending on state
    let input
    if (this.state.btn.type == 'submit' && !listExists) {
      input = `<input type=${this.state.btn.type} id="start-new-list" value="${this.state.btn.value}" />`

    }
    else if (listExists) {
      input = `<input type="text" id="start-new-list" placeholder="Edit the name here" value="" />`
    }
    else {
      input = `<input type=${this.state.btn.type} id="start-new-list" placeholder="${this.state.btn.placeholder}" />`
    }

    let introText
    let listStructure = ''
    if (this.state.clicked || listExists) {
      introText = ''
      listStructure = <div className="list-structure">
                        <List name={list.name}
                              rmItem={this.props.rmItem}
                              listItems={this.props.listItems}>
                        </List>
                        <CreateListItem addItem={this.props.addItem} />
                        <div className="publish-list-btn-container">
                          <RaisedButton className="publish-list-btn"
                                        label="Publish Your List"
                                        primary={true}
                                        onClick={this.handleCreate}
                                        onTouchTap={this.handleOpen}>
                          </RaisedButton>
                        </div>
                      </div>
    } else {
      introText = <div className="intro-text">Gotta makes recommending things&nbsp;easy. <br />Just create a list, publish and&nbsp;share.<br /><span className="intro-emphasis"> You Gotta try&nbsp;it!</span></div>
    }

    let popup = this.state.published
              ? <ConfirmationPopUp list={this.state.listID}
                confirmationPopupOpen={this.state.confirmationPopupOpen}
                handleClose={this.handleClose} />
              : ''

    return (
      <div id="new-list">
        <span onClick={this.handleClick} onKeyUp={this.handleKeyInput} dangerouslySetInnerHTML={{__html: input}} />
        {listStructure}
        {introText}
        {popup}
        <Snackbar
          className="snack-bar"
          open={this.state.snackOpen}
          message={this.state.publishError}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackClose}
        />
      </div>
    )
  }

  handleKeyInput = e => {
    this.props.handleNameChange(e)
    let placeholder = Object.keys(this.props.list).length ? 'Edit the name here' : 'Enter the list name'
    this.setState({btn: { placeholder, type: 'text', value: '' }})
  }

  handleOpen = () => {
    this.setState({confirmationPopupOpen: true})
  }

  handleClose = () => {
    this.setState({confirmationPopupOpen: false})
  }

  handleSnackClose = () => {
    this.setState({
      snackOpen: false
    })
  }

  //Fancy button - on click the type turns from submit to text
  handleClick = e => {
    let {list} = this.props
    let placeholder = Object.keys(list).length ? 'Edit the name here' : 'Enter the list name'
    this.setState({ btn: { placeholder, type: 'text', value: '' }, clicked: true})
  }

  publishList = list => {
    this.setState({published: true, listID: list.id})
  }

 publishList = list => {
    this.setState({published: true, listID: list.id})
  }

  // handle list creation request
  handleCreate = e => {
    let {list} = this.props
    let id = Object.keys(list).length ? list.id : ''

    if (!this.props.listItems.length)
      return this.setState({snackOpen: true, publishError: 'Please add at least one item to the list!'})

    if (id) {
      let meta = document.querySelector('meta[name="csrf-token"]').content
      let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })
      let options = {method: 'DELETE', headers, body: JSON.stringify({id})}

       fetch(`/lists/${id}/delete`, options)
       .then(response => response.json())
       .catch(err => console.log(err))
    }

    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })

    this.setState({confirmationPopupOpen: true})

    let newList = {
      name: this.props.list.name,
      items: this.props.listItems,
      user: this.props.user
    }

    // Check it name exists
    if (!newList.name)
      return this.setState({snackOpen: true, publishError: 'Please enter the list name!'})
    // Options for request
    let options = {method: 'POST', headers, body: JSON.stringify(newList)}

    // Post the creation request
    fetch('/lists/create', options).then(response => {
      return response.json()
    }).then(result => {
      this.publishList(result)
    })
    .catch(err => console.log(err))
  }
}

export default CreateNewList
