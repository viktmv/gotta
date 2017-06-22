import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

//Style for round Material UI buttons
const style = {
  marginLeft: 10,
  verticalAlign: 30,
  cssFloat: "right",
  marginRight: 30,
};

class CreateListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemName: '',
      itemDescription: '',
      itemLink: '',
      itemImage: '',

      link: false,
      name: false
    }
  }
  render () {
    let textFields

    if (this.state.link || this.state.name) {
      textFields = <div>
                      <TextField hintText="list-item name" className="create-name" type="name" onChange={this.updateName} />
                      <TextField hintText="list-item description" className="create-description" type="description" onChange={this.updateDescription} />
                    </div>
    }

    return (
      <div className="list-form">
        <div className="create-image item-image"></div>
        <TextField hintText="Type or paste link here" className="create-link" type="link" onChange={this.updateLink} />
        {textFields}
        <FloatingActionButton mini={true} style={style} onClick={this.handleAddClick}><ContentAdd /></FloatingActionButton>
      </div>
    )
  }

  handleAddClick = () => {
    const $ = el => document.querySelector(el)

    // Reset text fields display
    this.setState({link: false, name: false})

    let {itemName, itemDescription, itemLink, itemImage} = this.state
    let key = this.generateKey()

    // Add item to the list of items on the CreateNewList component
    this.props.addItem({itemName, itemDescription, itemLink, itemKey: key, itemImage})

    $('.create-name input').value = ''
    $('.create-link input').value = ''
    $('.create-link > div').style.opacity = 1
    $('.create-description input').value = ''

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

    // hide placeholder text
    $('.create-link > div').style.opacity = 0

    let data = { url: e.target.value }
    if (!data.url) return this.setState({link: false, name: false})

    // Check for the regular string TODO: Add some logic to handle not-link cases
    // Show other input fields
    if (!data.url.startsWith('http')) {
      return this.setState({name: true, link: false})
    }

    this.setState({link: true})

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

      if (title) {
        $('.create-name input').value = title[0]._value
        $('.create-name > div').style.opacity = 0
      }
      if (description) {
        $('.create-description input').value = description[0]._value
        $('.create-description > div').style.opacity = 0
      }
      if (image)
        $('.create-image').setAttribute('style', `background-image: url(${image[0]._value}); width: 72px; height: 72px;`);

      this.setState({itemName: title[0]._value,
                     itemLink: url[0]._value,
                     itemDescription: description[0]._value,
                     itemImage: image[0]._value,
                   })
    }).catch(err => console.log(err))
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
