import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { API } from '../store/middlewares/apiService'
import styled from 'styled-components';

import Picture from '../components/Picture'
import SelectedPicture from '../components/SelectedPicture'

import throttle from 'lodash.throttle';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  row-gap: 50px;
  justify-items: center;
  width:90%;
  margin-top: 5vmin;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPictures()
    this.props.fetchPictures()
    this.lazyFetchPictures = throttle(this.props.fetchPictures, 500)
    this.listenForScrollAndFetch()
  }

  // fetches new pictures when scrolled almost till the bottom
  listenForScrollAndFetch = () => {
    window.addEventListener('scroll', (e) => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - window.innerHeight/2) {
        this.lazyFetchPictures()
      }
    })
  }

  selectPicture = (picture) => {
    this.props.selectPicture(picture)
  }

  render() {
    const { pictures, selectedPicture } = this.props;

    return (
      <Container>
        {pictures &&
          pictures.map(p =>
            <Picture key={p.id} picture={p} handleClick={this.selectPicture}/>)}
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