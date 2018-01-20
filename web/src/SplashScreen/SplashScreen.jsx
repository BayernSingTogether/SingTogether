import React, { Component } from 'react';

import './SplashScreen.css';

class SplashScreen extends Component {
  render() {
    return (
      <div className="SplashScreen" style={{ height: window.innerHeight }} onClick={this.props.onClick} />
    );
  }
}

export default SplashScreen;
