import React, { Component } from 'react';
import './styles.css'

export default class Header extends Component {
  render(){
    return (
      <div className="Header">
        <h1>flickr Gallery</h1>
        <h3>Explore recent pictures uploaded to
        <a href="https://www.flickr.com/"> flickr</a>, <br/>
        from everywhere in the world.</h3>
        <p>Made by <a href="https://www.linkedin.com/in/jonportella/">Jon Portella</a>.<br/>
        Front end made with <a href="https://reactjs.org/">React</a> and
        <a href="https://redux.js.org/"> Redux</a>.
        For this demo deployment, the app uses a small
        <a href="https://developers.cloudflare.com/pages/functions/"> Cloudflare Pages Function</a>
        {' '}as a proxy so the browser can access the Flickr public feed.</p>
      </div>
    )
  }
}