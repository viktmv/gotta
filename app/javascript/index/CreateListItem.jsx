import React from 'react'
// Material-ui components
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
      name: '',
      description: '',
      link: '',
      img: '',
      // Flags:
      link: false,
      text: false,
      errorText: '',
      searchResults: [],
      titles: []
    }
  }

  render () {
    // Conditional display of input fields
    let textFields
    if (this.state.link || this.state.text) {
      textFields = <div>
                      <TextField  hintText="list-item name" className="create-name" type="name" onChange={this.updateName} />
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
         onFocus={this.resetErrorText} //removes error text when user clicks in text field
         onChange={this.updateLink} />
       <div onBlur={() => this.clearSearch(0)} className="autocomplete-field"><ul>{this.state.titles.map(t => <li><a onClick={this.populateInputs}>{t}</a></li>)}</ul></div>
        {textFields}
        <FloatingActionButton mini={true} style={style} onClick={this.handleAddClick}><ContentAdd /></FloatingActionButton>
      </div>
    )
  }

  populateInputs = e => {

    console.log('hey')
    const $ = el => document.querySelector(el)
    let name = e.target.text

    let selected = this.state.searchResults.find(item => item.title == name)
    console.log(selected)

    $('.create-name input').value = selected.title
    $('.create-name > div').style.opacity = 0

    $('.create-description input').value = selected.snippet
    $('.create-description > div').style.opacity = 0


    let image = selected.pagemap.metatags[0]['og:image']

    $('.create-image').setAttribute('style', `background-image: url(${image}); width: 72px; height: 72px;`)
    this.setState({name: selected.title,
                   link: selected.link || '',
                   description: selected.snippet || '',
                   img: image || ''})
    this.clearSearch()
  }

  clearSearch = (flag = 1) => {
    if (!flag) {
      this.setState({link: false, text: false, titles: [], errorText: ''})
    }
    else this.setState({titles: [], errorText: ''})
  }

  resetInputs = () => {
    const $ = el => document.querySelector(el)
    $('.create-name input').value = ''
    $('.create-link input').value = ''
    $('.create-link > div').style.opacity = 1
    $('.create-description input').value = ''
    $('.create-image').setAttribute('style', '');
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
    this.clearSearch(0)

    // Generate unique key for react components
    let key = this.generateKey()

    // Add item to the list of items on the CreateNewList component
    this.props.addItem({name, description, link, itemKey: key, img})

    this.resetInputs()

    this.setState({
      name: '',
      description: '',
      link: '',
      img: '',
    })
  }

  updateName = e => {
    let name = e.target.value
    this.setState({name})
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
    if (!data.url) {
      this.clearSearch()
      this.resetInputs()
      return
    }

    // Check for the regular string TODO: Add some logic to handle not-link cases
    // Show other input fields
    if (!data.url.startsWith('http')) {
      let name = data.url

      this.googleName(name)
      // this.duckduckName(name)
      .then((res) => {
        console.log(res)
        let items = this.state.searchResults.map(item => item.title)
        this.setState({titles: items})
        // document.querySelector('.autocomplete-field ul').innerHTML =
          // items.reduce((total, title) => total += `<li>${title}</li>`, '')
        return this.setState({text: true, link: false})
      }).catch(console.warn)
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



      this.setState({name: title ? title[0]._value : '',
                     link: url ? url[0]._value : '',
                     description: description? description[0]._value : '',
                     img: image? image[0]._value : '',
                   })
    }).catch(err => console.warn(err))
  }

  duckduckName = name => {
    let q = name
    let url = `http://api.duckduckgo.com/?q=${q}&format=json&pretty=1`

    return fetch(url)
            .then(res => res.json())
            .then(data => this.setState({searchResults: data.RelatedTopics}))
            .then(console.log)
            .catch(console.warn)
  }

  googleName = name => {
    let key = 'AIzaSyA34xUs-ixxAaUibuSTrjRJ0CKsDtPpJvs'
    // let key2 = 'AIzaSyCoYF61Hi1HrfEwjHUEiGIz1kkDUsZzafI'

    let cx = '003795560815676233470:zx_lx55noqy';
    let query = name
    if (name.length < 1) return

    let url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${query}`
    let headers = new Headers({'Access-Control-Allow-Origin': '*'})
    let options = {headers}

    return fetch(url, options)
            .then(res => res.json())
            .then(data => this.setState({searchResults: data.items}))
            .catch(console.warn)
  }

  generateKey = (() => {
    let num = 0
    return () => `${num++}-key`
  })()
}

export default CreateListItem
