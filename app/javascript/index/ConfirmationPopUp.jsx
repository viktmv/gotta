import React from 'react'
// Material-ui components
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class ConfirmationPopUp extends React.Component {
  render() {

    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ]

    return (
      <Dialog title="Your list has been published!"
        actions={actions}
        modal={false}
        open={this.props.confirmationPopupOpen}
        onRequestClose={this.props.handleClose} className="confirmtion-pop-up">
        <a href={`http://localhost:3000/lists/${this.props.list}`} target="_blank">Go check it out</a>
      </Dialog>
    )
  }
}

export default ConfirmationPopUp
