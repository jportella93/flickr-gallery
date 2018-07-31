import React, { Component } from 'react';
import './styles.css'

import PropTypes from 'prop-types';

import { getAvailableSize } from '../../utils/pictures'

export default class Picture extends Component {
  static propTypes = {
    picture: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  render() {
    const { picture, handleClick } = this.props

    return (
      <div className="Picture" onClick={() => handleClick(picture)}>
        <img src={getAvailableSize(picture)} alt={picture.title || 'Picture'}/>
        <div className="Picture__img-mask">
          <h2 className="Picture__title">
            {picture.title || 'Title'} <br/> <br/>
            <span>By user {picture.owner || 'owner'}</span>
          </h2>
        </div>
      </div>
    )
  }
}