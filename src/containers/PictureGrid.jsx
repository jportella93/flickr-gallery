import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { API } from '../store/middlewares/apiService'
import styled from 'styled-components';

import Picture from '../components/Picture'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  width: 80vw;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPictures()
    this.props.fetchPictures()
    this.props.fetchPictures()
  }

  // fetches new pictures when scrolled almost till the bottom
  lazyFetchPictures = () => {
    const innerH = window.innerHeight,
          scrollY = window.scrollY,
          docH = document.documentElement.scrollHeight
    window.addEventListener('scroll', (e) => {
      if (innerH + scrollY >= docH - 100) this.props.fetchPictures()
    })
  }

  render() {
    const { pictures } = this.props;
    this.lazyFetchPictures()

    return (
      <Container>
        {pictures && pictures.map(p => <Picture key={p.id} picture={p}/>)}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid)