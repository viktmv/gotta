import React from 'react'
import ListItem from './ListItem'

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
    let fb = function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
              fjs.parentNode.insertBefore(js, fjs);
            }

    return (<div>
              <div id="fb-root"></div>
              <div className="fb-share-button" data-href="https://github.com" data-layout="button_count" data-size="large" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</a></div>
              <div>{fb(document, 'script', 'facebook-jssdk')}</div>
              <h2>{this.props.name}</h2>
              {this.state.listItems.map((item, i)=> <ListItem key={i} data={item} />)}
            </div>)
  }

  handleRemoveClick = e => {
    this.props.rmItem(e.target.parentNode)
  }
}

export default List
