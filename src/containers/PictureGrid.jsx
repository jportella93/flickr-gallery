import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import throttle from 'lodash.throttle';

import { API } from '../store/middlewares/apiService'

import Picture from '../components/Picture'
import SelectedPicture from '../components/SelectedPicture'
import PictureLoader from '../components/PictureLoader';

import Masonry from 'react-masonry-component';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 5vmin;
  column-gap:5vim;
  justify-items: center;
  width:100%;
  margin: 5vmin 0;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object,
    fetchPictures: PropTypes.func.isRequired,
    selectPicture: PropTypes.func.isRequired,
  };

  componentWillMount() {
    // Initial two calls to server
    this.props.fetchPictures()
    this.props.fetchPictures()

    //throttle method to avoid unnecesary calls to server
    this.lazyFetchPictures = throttle(this.props.fetchPictures, 500)

    this.listenForScrollAndFetch() // From this point on, only fetch on scroll
  }

  // fetch new pictures when scrolled almost till the bottom
  listenForScrollAndFetch = () => {
    window.addEventListener('scroll', (e) => {
      const pictures = document.getElementsByClassName('Picture')
      const lastPicture = pictures[pictures.length - 1]
      if (lastPicture) {
        const lastPicturePosition = Math.round(Number(lastPicture.style.top.split('px').join('')))
        const scrollPosition = Math.round(window.scrollY)

        if (scrollPosition + 1500 > lastPicturePosition) {
          this.lazyFetchPictures()
        }
      }
    })
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
    const { pictures, selectedPicture } = this.props;

    return (
      <Container>
         <Masonry
            className={'masonry-gallery'}
        >
            {this.renderPictures(pictures)}
        </Masonry>
        {selectedPicture &&
          <SelectedPicture selectedPicture={selectedPicture}
          handleClick={this.selectPicture} />}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  pictures: state.pictures.pictureList,
  selectedPicture: state.pictures.selectedPicture
})

const mapDispatchToProps = dispatch => ({
  fetchPictures: () => dispatch({
    type: 'FETCH_PICTURES',
    [API]: {
      path: '/pictures'
    }
  }),
  selectPicture: (picture) => dispatch({
    type: 'SELECT_PICTURE',
    data: picture
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid)