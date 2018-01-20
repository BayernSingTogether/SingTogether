import React, { Component } from 'react';
import './SplashScreen.css';

class SplashScreen extends Component {
  render() {
    return (
      <div className="SplashScreen">
        <h1>
          Wilkommen!
        </h1>
        
        <button onClick={this.props.onClick}>
          BRING IT ON!
        </button>
      </div>
    );
  }
}

export default SplashScreen;
