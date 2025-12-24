import React, { Component } from 'react';
import '@atlaskit/css-reset'
import './App.css';

import PictureGrid from './containers/PictureGrid.jsx'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PictureGrid/>
      </div>
    );
  }
}

export default App;
