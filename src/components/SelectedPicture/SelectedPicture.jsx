import React, { Component } from 'react';
import './styles.css'
import PropTypes from 'prop-types';

import { getAvailableSize } from '../../utils/pictures'
import { getMonthYear } from '../../utils/date';
import { sliceExtra } from '../../utils/strings';

export default class SelectedPicture extends Component {
  static propTypes = {
    selectedPicture: PropTypes.object,
    handleClick: PropTypes.func.isRequired
  };

  render() {

    const { selectedPicture, handleClick } = this.props;
    if (!selectedPicture) return null;

    const {
      title,
      link,
      authorName,
      authorUrl,
      published,
      tags,
      imageUrlLarge,
      description,
    } = selectedPicture;

    return (
      <div className="SelectedPicture__outer" onClick={()=> handleClick(null)}>

        <div
          className="SelectedPicture__inner-container"
          onClick={(e) => e.stopPropagation()}
        >
          <a href={link} target="_blank" rel="noreferrer">
            <h1>{sliceExtra(title,100) || 'Untitled'}</h1>
          </a>

          <a href={link} target="_blank" rel="noreferrer">
            <img
              src={imageUrlLarge || getAvailableSize(selectedPicture)}
              alt={title || 'Picture'}
            />
          </a>

          <a href={authorUrl} target="_blank" rel="noreferrer">
            <h2>By {authorName || 'Unknown'}</h2>
          </a>

          {published && <p>Published {getMonthYear(published)}</p>}

          {description && (
            <p style={{ fontStyle: 'italic' }}>{sliceExtra(description, 300)}</p>
          )}

          {tags?.length ? <p>Tags: {tags.slice(0, 10).join(', ')}</p> : null}

        </div>
      </div>
    )
  }
}