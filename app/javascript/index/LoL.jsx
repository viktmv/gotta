import React from 'react'

import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import ActionAndroid from 'material-ui/svg-icons/action/android'
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


    const edilete =  <RaisedButton
                       icon={<ActionAndroid />}
                       style={btnStyle}
                       onTouchTap={this.handleEditClick}
                     />

    // <div>

                    //   <RaisedButton
                    //     icon={<ActionAndroid />}
                    //     style={btnStyle}
                    //     onTouchTap={this.props.handleDelete}
                    //   />
                    // </div>

  return (
      <div >
        <div className="nav-button" onTouchTap={this.handleToggle}>My Lists</div>
        <Drawer // Sidebar where the LoL is kept
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
                rightIconButton={edilete}
                data-id={list.id}
                key={i}>
                  <a href={`lists/${list.id}`}
                    target="_blank">{list.name}
                  </a>
              </ListItem>)
          })}
        </div>
      </Drawer>
    </div>
    )
  }
  handleEditClick = (e) => {
    this.props.handleEdit(e)
    this.setState({open: false})
  }
  handleToggle = () => this.setState({open: !this.state.open})
}

export default LoL
