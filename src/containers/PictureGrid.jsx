import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { API } from '../store/middlewares/apiService'
import styled from 'styled-components';

import Picture from '../components/Picture'

const Container = styled.div`
  display: grid;
  grid-template: 1fr /repeat(4,1fr);
  width: 80vw;
  `

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPictures()
  }

  render() {
    const { pictures } = this.props
    console.log(this.props);

    return (
      <Container>
        {pictures && pictures.map(p => <Picture picture={p}/>)}
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