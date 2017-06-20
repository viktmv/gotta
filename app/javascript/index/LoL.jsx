
import React from 'react'

class LoL extends React.Component {
  constructor() {
    super()
    this.state = {
      lists: []
    }
  }

  componentWillMount = () => {
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })


    let init = {
                 method: 'GET',
                 headers: headers,
               }

    fetch('/lists/all/' + this.props.user.id)
    .then(res => res.json())
    .then(lists => this.setState({lists}))
    .catch(err => console.warn(err))

  }

  render() {
    return (
      <div>
        <h2>My lists</h2>
        <ul>
          {this.state.lists.map((list, i) => {
            return (<li key={i}><a href={`lists/${list.id}`} target="_blank">{list.name}</a></li>)
          })}
        </ul>
      </div>
    )
  }
}

export default LoL
