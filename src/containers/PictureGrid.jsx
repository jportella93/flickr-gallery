import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import throttle from 'lodash.throttle';

import { API } from '../store/middlewares/apiService'
import { PICTURES_API_URL } from '../config/api.config';
import { normalizeFlickrPublicFeed } from '../utils/pictures';

import Picture from '../components/Picture'
import SelectedPicture from '../components/SelectedPicture'
import PictureLoader from '../components/PictureLoader';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 5vmin;
  column-gap: 5vmin;
  justify-items: center;
  width:100%;
  margin: 5vmin 0;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    fetchPictures: PropTypes.func.isRequired,
    selectPicture: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // Initial call
    this.props.fetchPictures();

    // throttle method to avoid unnecessary calls
    this.lazyFetchPictures = throttle(this.props.fetchPictures, 750);

    this.listenForScrollAndFetch(); // From this point on, only fetch on scroll
  }

  componentWillUnmount() {
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
    if (this.lazyFetchPictures?.cancel) this.lazyFetchPictures.cancel();
  }

  // fetch new pictures when scrolled almost till the bottom
  listenForScrollAndFetch = () => {
    this.onScroll = () => {
      if (window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - window.innerHeight/0.5) {
        this.lazyFetchPictures()
      }
    };
    window.addEventListener('scroll', this.onScroll);
  }

  renderPictures = (pictures) => {
    const pictureLoaders = 5 // Number of loaders (blank images) at the end of the grid
    return [
      ...pictures.map(p => <Picture key={p.id} picture={p} handleClick={this.selectPicture} />),
      this.renderPictureLoaders(pictureLoaders)
    ]
  }

  renderPictureLoaders = (num) => {
    // Calculate the opacity for each loader so it results in a nice scaling down grayscale
    let res = []
    const step = 1 / num;
    for (let i = 1; i <= num; i++) {
      let opacity = step * i
      if (opacity === 1) opacity -= 0.1 // We don't want opacity === 1, too bright!
      res.push(opacity)
    }
    return res.reverse().map(n => <PictureLoader opacity={n.toFixed(1)} key={n} />)
  }

  selectPicture = (picture) => {
    this.props.selectPicture(picture)
  }

  render() {
    const { pictures, selectedPicture, isLoading, error } = this.props;
    return (
      <Container>
        {error && (
          <div style={{ maxWidth: 700, padding: '0 16px', textAlign: 'center' }}>
            <h2>Couldn’t load pictures</h2>
            <p>{error}</p>
          </div>
        )}
        {pictures && this.renderPictures(pictures)}
        {!pictures?.length && isLoading && this.renderPictureLoaders(8)}
        {selectedPicture &&
          <SelectedPicture selectedPicture={selectedPicture}
          handleClick={this.selectPicture} />}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  pictures: state.pictures.pictureList,
  selectedPicture: state.pictures.selectedPicture,
  isLoading: state.pictures.isLoading,
  error: state.pictures.error,
})

const mapDispatchToProps = dispatch => ({
  fetchPictures: () => dispatch({
    type: 'FETCH_PICTURES',
    [API]: {
      url: PICTURES_API_URL,
      transform: normalizeFlickrPublicFeed,
    }
  }),
  selectPicture: (picture) => dispatch({
    type: 'SELECT_PICTURE',
    data: picture
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid)