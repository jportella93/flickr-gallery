import React, { Component } from 'react';
import './styles.css'
import PropTypes from 'prop-types';

import { getAvailableSize } from '../../utils/pictures'

export default class SelectedPicture extends Component {
  static propTypes = {
    selectedPicture: PropTypes.object,
    handleClick: PropTypes.func.isRequired
  };

  getPictureUrl = (owner, pId) => `https://www.flickr.com/photos/${owner}/${pId}`

  getOwnerProfile = (owner) => `https://www.flickr.com/photos/${owner}`

  render() {

    const { selectedPicture, handleClick } = this.props;
    const { owner, id, ispublic } = selectedPicture

    return (
      <div className="SelectedPicture__outer" onClick={()=> handleClick(null)}>
        {selectedPicture &&
          <a href={this.getPictureUrl(owner, id)}>
            <div className="SelectedPicture__inner-container" >
              <h1>{selectedPicture.title || 'Title'}</h1>
              <img src={getAvailableSize(selectedPicture).source}
              alt={selectedPicture.title || 'Picture'} />
              <a href={this.getOwnerProfile(owner)}>
                <h2>By user {owner}</h2>
              </a>
              <h3>Public: {ispublic === 1 ? 'Yes' : 'No'}</h3>
            </div>
          </a>
        }
      </div>
    )
  }
}