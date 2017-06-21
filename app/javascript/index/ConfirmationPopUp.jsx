import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class ConfirmationPopUp extends React.Component {
  render() {

    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
    ];

    return (
      <Dialog title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.props.confirmationPopupOpen}
          onRequestClose={this.props.handleClose} className="confirmtion-pop-up">
        <h4>Your list has been published!</h4>
        <a href={`http://localhost:3000/lists/${this.props.list}`} target="_blank">Go check it out</a>
      </Dialog>
    )
  }
}

export default ConfirmationPopUp
