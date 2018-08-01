import React, { Component } from 'react';
import './styles.css'
import PropTypes from 'prop-types';

import { getAvailableSize } from '../../utils/pictures'
import { getDateFromUnix } from '../../utils/date';
import { sliceExtra } from '../../utils/strings';

export default class SelectedPicture extends Component {
  static propTypes = {
    selectedPicture: PropTypes.object,
    handleClick: PropTypes.func.isRequired
  };

  toPictureUrl = (owner, pId) => `https://www.flickr.com/photos/${owner}/${pId}`

  toOwnerProfile = (owner) => `https://www.flickr.com/photos/${owner}`

  render() {

    const { selectedPicture, handleClick }             = this.props,
          { ownerInfo, owner, id, title }              = selectedPicture,
          { first_name:name, last_name:surname,
            city, country, profile_description:desc,
            website, join_date}                        = ownerInfo.profile

    return (
      <div className="SelectedPicture__outer" onClick={()=> handleClick(null)}>
        {selectedPicture &&
          <div onClick={() => window.location = this.toPictureUrl(owner, id)}
            className="SelectedPicture__inner-container" alt="Open picture on Flickr">
            <h1>{sliceExtra(title,100) || 'Untitled'}</h1>
            <img src={getAvailableSize(selectedPicture)}
              alt={title || 'Picture'} />
            <a href={this.toOwnerProfile(owner)} alt="Open user profile on Flickr">
              <h2>By {`${name || 'nameless'} ${surname || ''}`}</h2>
            </a>
            {join_date && <p>Flickr member from {getDateFromUnix(join_date)}</p>}
            {desc && <p style={{fontStyle:'italic'}}>{sliceExtra(desc,300)}</p>}
            {city || country ? <p>From {`${city || ''} ${country || ''}`}</p> : null}
            {website && <h4><a href={website}>{website}</a></h4>}
          </div>
        }
      </div>
    )
  }
}