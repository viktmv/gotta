import React from 'react'

class ConfirmationPopUp extends React.Component {
  render() {
    return (
      <div className="confirmtion-pop-up">
        <h4>Your list has been published!</h4>
        <a href={`http://localhost:3000/lists/${this.props.list}`} target="_blank">Go check it out</a>
      </div>
    )
  }
}

export default ConfirmationPopUp
