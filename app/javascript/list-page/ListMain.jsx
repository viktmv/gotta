import React from 'react'
import ListItem from './ListItem'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      listItems: this.props.listItems
    }
  }

  componentWillMount() {
    let meta = `
                <meta property="og:url"         content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
                <meta property="og:type"        content="article" />
                <meta property="og:title"       content="When Great Minds Don’t Think Alike" />
                <meta property="og:description" content="How much does culture influence creative thinking?" />
                <meta property="og:image"       content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
              `

    let head = document.querySelector('head')
    head.innerHTML += meta
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.sendMessage}
      />,
    ];

    // Facebook share button
    let fb = function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
              fjs.parentNode.insertBefore(js, fjs);
            }

    // Twitter share button
    let twttr = function() {
                 window.twttr = (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                  if (d.getElementById(id)) return t;
                  js = d.createElement(s);
                  js.id = id;
                  js.src = "https://platform.twitter.com/widgets.js";
                  fjs.parentNode.insertBefore(js, fjs);

                  t._e = [];
                  t.ready = function(f) {
                    t._e.push(f);
                  };
                  return ''
                }(document, "script", "twitter-wjs"))
              }

    // Email sharing
    let body = `Hey, here are some cool things I found!\n Here's the link: http://localhost:3000/lists/${this.props.id} `.replace('%20', ' ')
    let subj = `You just gotta check this out!`.replace('%20', ' ')

    let style = {
      width: 300,
      float: 'right',
      background: 'none'
    }

    let customContentStyle = {
      width: 350
    }
    return (<div>
              <Toolbar style={style}>
                <ToolbarGroup className="socials" lastChild={true} firstChild={true}>
                  <a href={`mailto:friend@somemail.com?subject=${subj}&body=${body}`}>Email Your Friends!</a>
                  <div id="fb-root"></div>
                  <div className="fb-share-button" data-href="https://github.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
                    <IconButton
                      iconClassName="muidocs-icon-custom-github" tooltip="share on Facebook!"
                      tooltipPosition="bottom-right"
                      className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</IconButton>
                  </div>
                  <div>
                    <IconButton className="twitter-share-button"
                      iconClassName="muidocs-icon-custom-github" tooltip="share on Twitter!"
                      tooltipPosition="bottom-right"
                      data-size="large"
                      href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20stuff">
                      Tweet
                    </IconButton>
                  </div>
                  <div>
                    <IconButton className="twilio-text-message"
                      iconClassName="muidocs-icon-custom-github" tooltip="share with a text message!"
                      tooltipPosition="bottom-right"
                      data-size="large"
                      onTouchTap={this.handleOpen}>
                      Send Text!
                    </IconButton>
                    <Dialog
                       title="Share with a simple text message!"
                       actions={actions}
                       modal={false}
                       contentStyle={customContentStyle}
                       open={this.state.open}
                     >
                       <TextField
                         id="text-field-controlled"
                         className="phone-sms"
                         name="Phone number"
                         type="tel"
                         floatingLabelText="Friend's phone number"
                       />
                     </Dialog>
                  </div>
                </ToolbarGroup>
              </Toolbar>
              {fb(document, 'script', 'facebook-jssdk')}
              {twttr()}
              <h2>{this.props.name}</h2>
              {this.state.listItems.map((item, i)=> <ListItem key={i} data={item} />)}
            </div>)
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  sendMessage = () => {
    const $ = el => document.querySelector(el)

    let tel = $('.phone-sms input').value
    let description = `You've gotta check this out! ${window.location}`
    let data = { name, tel, description }

    let meta = document.querySelector('meta[name="csrf-token"]').content
    let headers = new Headers({'X-CSRF-Token': meta, 'Content-Type': 'application/json' })

    // Options for request
    let init = {
                 method: 'POST',
                 headers: headers,
                 body: JSON.stringify(data)
               }

    // Post the creation request
    fetch(`/lists/${this.props.id}/sms`, init)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))

    this.handleClose()
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.parentNode)
  }
}

export default List
