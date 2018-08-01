/** https://codepen.io/woodwoerk/pen/YWjWzo
 * Samsung TV Loader by Joe Harry
 * https://codepen.io/woodwoerk
*/

import React, { Component } from 'react';
import './styles.css'

export default class Spinner extends Component {
  render() {
    return (
      <div className="Spinner">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo"></feBlend>
            </filter>
          </defs>
        </svg>
        <div className="Spinner__blob Spinner__blob-0"></div>
        <div className="Spinner__blob Spinner__blob-1"></div>
        <div className="Spinner__blob Spinner__blob-2"></div>
        <div className="Spinner__blob Spinner__blob-3"></div>
        <div className="Spinner__blob Spinner__blob-4"></div>
        <div className="Spinner__blob Spinner__blob-5"></div>
      </div>
    )
  }
}