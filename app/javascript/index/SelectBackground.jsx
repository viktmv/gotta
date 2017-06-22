import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


class SelectBackground extends React.Component {

  render() {
    return (
      <div className="select-bg-colour">
        <div className="colour-controls" onClick={this.selectColour}
          data-colour="Light green"
          style={{background: '#EFFDE0' }}
          onTouchTap={this.selectColour}
          />
        <div className="colour-controls" onClick={this.selectColour}
          data-colour="Light purple"
          style={{background: '#F5E3Fb' }}
          onTouchTap={this.selectColour}
          />
        <div className="colour-controls" onClick={this.selectColour}
          data-colour="Pale peach"
          style={{background: '#FDF0EC' }}
          onTouchTap={this.selectColour}
          />
      </div>
    )
  }

  selectColour = e => {
    let colour
    switch (e.target.dataset.colour) {
      case 'Light green':
        colour = '#EFFDE0'
        break
      case 'Light purple':
        colour = '#F5E3Fb '
        break
      case 'Pale peach':
        colour = '#FDF0EC'
        break
      default:
        colour = '#fff'
    }

    document.querySelector('html').style.background = colour
  }
}


export default SelectBackground
