import React, { Component } from 'react';
import './styles.css'

export default class Picture extends Component {

  // Sometimes flickr doesn't have medium size, this function returns a small size as a fallback
  getAvailableSize = (picture) => picture.sizes.size[5] ? picture.sizes.size[5] : picture.sizes.size[0]

  render() {
    const { picture } = this.props

    return (
      <div className="Picture">
        <img src={this.getAvailableSize(picture).source} alt={picture.title || 'Picture'}/>
        <div className="Picture__img-mask">
          <h3 className="Picture__title">
            {picture.title || 'Title'} <br/>
            By user {picture.owner || 'owner'}
          </h3>
        </div>
      </div>
    )
  }
}