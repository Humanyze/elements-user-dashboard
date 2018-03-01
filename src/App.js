import React, { Component } from 'react';

import './App.css';

import Header from './components/common/header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          Hello World
        </p>
      </div>
    );
  }
}

export default App;
