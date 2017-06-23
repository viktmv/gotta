import React from 'react'

import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'

class LoL extends React.Component {
  constructor() {
    super()
    this.state = {
      lists: [],
      open: false
    }
  }

  componentWillMount = () => {
    this.fetchUserLists()
  }

  render() {

    const style = {
      margin: 5
    }

    const btnStyle = {
      width: 25,
      height: 25
    }

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    return (
        <div >
          <div className="nav-button" onTouchTap={this.handleToggle}>My Lists</div>
          <Drawer
            docked={false}
            openSecondary={true}
            width={250}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
          <div>
            <h2 style={{textAlign: 'center'}}>My lists</h2>
            {this.state.lists.map((list, i) => {
              return (
                <ListItem
                  className="my-list-item"
                  data-id={list.id}
                  key={i}>
                    <a href={`lists/${list.id}`}
                      target="_blank">{list.name}
                    </a>
                    <RaisedButton
                       icon={<ActionAndroid />}
                       style={btnStyle}
                       onTouchTap={this.handleEditClick}
                     />
                     <RaisedButton
                        icon={<ActionDelete />}
                        style={btnStyle}
                        onTouchTap={this.handleDeleteClick}
                      />
                </ListItem>)
            })}
          </div>
        </Drawer>
      </div>
      )
  }
  handleEditClick = e => {
    this.props.handleEdit(e)
    this.setState({open: false})
  }

  fetchUserLists = () => {
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })
    let init = { method: 'GET', headers}

    return fetch('/lists/all/' + this.props.user.id)
           .then(res => res.json())
           .then(lists => this.setState({lists}))
           .catch(err => console.warn(err))
  }

  handleDeleteClick = e => {
    this.props.handleDelete(e)
    .then(this.fetchUserLists)
  }

  handleToggle = () => {
    this.fetchUserLists()
    .then(() => this.setState({open: !this.state.open}))
  }
}

export default LoL
