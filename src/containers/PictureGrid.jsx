import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { API } from '../store/middlewares/apiService'

class PictureGrid extends Component {
  static propTypes = {
    pictures: PropTypes.array,
    selectedPicture: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchPictures()
    setTimeout(this.props.fetchPictures(), 1000)
  }

  render() {
    return (
      <h1>PictureGrid works!</h1>
    )
  }
}

const mapStateToProps = state => ({
  pictures: state.pictures.pictures,
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