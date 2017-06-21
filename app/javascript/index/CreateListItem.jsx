import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

const style = {
  marginLeft: 10,
  verticalAlign: -10,
};

class CreateListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemName: '',
      itemDescription: '',
      itemLink: '',
      itemImage: ''
    }
  }
  render () {
    return (
      <div>
        <div className="create-image item-image"></div>
        <input className="create-link" type="link" onChange={this.updateLink} placeholder="list-item link" />
        <input className="create-name" type="name" onChange={this.updateName} placeholder="list-item name" />
        <input className="create-description" type="description" onChange={this.updateDescription}placeholder="list-item description" />
        <FloatingActionButton mini={true} style={style} onClick={this.handleAddClick}><ContentAdd /></FloatingActionButton>
      </div>
    )
  }

  handleAddClick = () => {
    const $ = el => document.querySelector(el)

    let {itemName, itemDescription, itemLink, itemImage} = this.state
    let key = this.generateKey()

    // Add item to the list of items on the CreateNewList component
    this.props.addItem({itemName, itemDescription, itemLink, itemKey: key, itemImage})

    $('.create-name').value = ''
    $('.create-link').value = ''
    $('.create-description').value = ''
    $('.create-image').setAttribute('style', '');

    this.setState({
      itemName: '',
      itemDescription: '',
      itemLink: '',
      itemImage: ''
    })
  }

  updateName = (e) => {
    this.setState({itemName: e.target.value})
  }

  updateDescription = (e) => {
    this.setState({itemDescription: e.target.value})
  }

  updateLink = (e) => {
    // Helper
    const $ = el => document.querySelector(el)

    let data = { url: e.target.value }
    if (!data.url) return

    // Check for the regular string TODO: Add some logic to handle not-link cases
    if (!data.url.startsWith('http')) return console.log('this is a regular string')

    // request options
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json'})
    let init = {
                 method: 'POST',
                 headers: headers,
                 body: JSON.stringify(data)
               }

    fetch('/connect', init)
    .then(response => response.json())
    .then(res => {
      let {title, site_name, description, url, image} = res

      if (title)
        $('.create-name').value = title[0]._value
      if (description)
        $('.create-description').value = description[0]._value
      if (image)
        $('.create-image').setAttribute('style', `background-image: url(${image[0]._value}); width: 72px; height: 72px;`);

      this.setState({itemName: title[0]._value,
                     itemLink: url[0]._value,
                     itemDescription: description[0]._value,
                     itemImage: image[0]._value})
    }).catch(err => console.log(err))
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
