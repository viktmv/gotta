import React from 'react'
// Material-ui components
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

//Style for round Material UI buttons
// const style = {
//   marginLeft: 10,
//   verticalAlign: 30,
//   cssFloat: "right",
//   marginRight: 30,
// };

class CreateListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      link: '',
      img: '',
      // Flags:
      link: false,
      text: false,
      errorText: ''
    }
  }

  render () {
    // Conditional display of input fields
    let textFields
    if (this.state.link || this.state.text) {
      textFields = <div>
                      <TextField hintText="list-item name" className="create-name" type="name" onChange={this.updateName} />
                      <TextField hintText="list-item description" className="create-description" type="description" onChange={this.updateDescription} />
                    </div>
    }

    return (
      <div className="list-form">
        <div className="create-image item-image"></div>
        <TextField
         hintText="Type or paste link here"
         className="create-link"
         errorText={this.state.errorText}
         type="link"
         onFocus={this.resetErrorText.bind(this)} //removes error text when user clicks in text field
         onChange={this.updateLink.bind(this)} />
        {textFields}
        <FloatingActionButton mini={true} className="add-list-item" onClick={this.handleAddClick}><ContentAdd /></FloatingActionButton>
      </div>
    )
  }

  handleAddClick = () => {
    // Helper function
    const $ = el => document.querySelector(el)

    let {name, description, link, img, text} = this.state
    // if name is empty, tell the user
    if (link || text) {
      this.setState({ errorText: '' })
    } else {
      return this.setState({ errorText: 'Please enter something!' })
    }

    // Reset text fields display
    this.setState({
      link: false,
      text: false,
      errorText: '',
    })

    // Generate unique key for react components
    let key = this.generateKey()

    // Add item to the list of items on the CreateNewList component
    this.props.addItem({name, description, link, itemKey: key, img})

    // Reset input fields
    $('.create-name input').value = ''
    $('.create-link input').value = ''
    $('.create-link > div').style.opacity = 1
    $('.create-description input').value = ''
    $('.create-image').setAttribute('style', '');

    this.setState({
      name: '',
      description: '',
      link: '',
      img: '',
    })
  }

  updateName = (e) => {
    this.setState({name: e.target.value})
  }

  updateDescription = (e) => {
    this.setState({description: e.target.value})
  }

  resetErrorText = (e) => {
    this.setState({errorText: ''})
  }

  updateLink = (e) => {
    // Helper
    const $ = el => document.querySelector(el)

    // hide placeholder text
    $('.create-link > div').style.opacity = 0

    let data = { url: e.target.value }
    if (!data.url) return this.setState({link: false, text: false})

    // Check for the regular string TODO: Add some logic to handle not-link cases
    // Show other input fields
    if (!data.url.startsWith('http')) {
      return this.setState({text: true, link: false})
    }

    this.setState({link: true})

    // Request options
    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json'})
    let init = {
                 method: 'POST',
                 headers: headers,
                 body: JSON.stringify(data)
               }
    // Perform the request
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

      this.setState({name: title[0]._value,
                     link: url[0]._value,
                     description: description[0]._value,
                     img: image[0]._value,
                   })
    }).catch(err => console.warn(err))
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
