import React from 'react'
import ListItem from './ListItem'

import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: this.props.listItems
    }
  }

  componentWillMount() {
    let meta = `
                <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
                <meta property="og:type"               content="article" />
                <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
                <meta property="og:description"        content="How much does culture influence creative thinking?" />
                <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
              `

    let head = document.querySelector('head')
    head.innerHTML += meta
  }

  render() {
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
                 return (window.twttr = (function(d, s, id) {
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

                }(document, "script", "twitter-wjs")))
              }

    // Email sharing
    let body = `Hey, here are some cool things I found!\n Here's the link: http://localhost:3000/lists/${this.props.id} `.replace('%20', ' ')
    let subj = `You just gotta check this out!`.replace('%20', ' ')

    let style = {
      width: 300,
      float: 'right',
      background: 'none'
    }
    return (<div>
              <Toolbar style={style}>
                <ToolbarGroup className="socials" lastChild={true} firstChild={true}>
                  <a href={`mailto:friend@somemail.com?subject=${subj}&body=${body}`}>Email Your Friends!</a>
                  <div id="fb-root"></div>
                  <div className="fb-share-button" data-href="https://github.com" data-layout="button_count" data-size="large" data-mobile-iframe="true">
                    <IconButton
                      iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"
                      tooltipPosition="bottom-right"
                      className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</IconButton>
                  </div>
                  <div>
                    <IconButton className="twitter-share-button"
                      iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"
                      tooltipPosition="bottom-right"
                      data-size="large"
                      href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20stuff">
                      Tweet
                    </IconButton>
                  </div>
                </ToolbarGroup>
              </Toolbar>
              {fb(document, 'script', 'facebook-jssdk')}
              {twttr()}
              <h2>{this.props.name}</h2>
              {this.state.listItems.map((item, i)=> <ListItem key={i} data={item} />)}
            </div>)
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.parentNode)
  }
}

export default List
