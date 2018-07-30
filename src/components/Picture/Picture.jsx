import React, { Component } from 'react';
import './styles.css'

export default class Picture extends Component {
  render() {
    const { picture } = this.props

    return (
      <div className="Picture">
        <img src={picture.sizes.size[5].source} alt={picture.title || 'Picture'}/>
        <div className="Picture__img-mask">
          <h3 className="Picture__title">{picture.title || 'Title'}</h3>
        </div>
      </div>
    )
  }
}