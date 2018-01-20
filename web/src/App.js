import React, { Component } from 'react';

import SplashScreen from './SplashScreen/SplashScreen'
import SongList from './SongList/SongList'
import Player from './Player/Player'
import Streaming from './Streaming/Streaming'

import './App.css';


class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      currentView: 'splashscreen'
    }
  }
  render() {
    if (this.state.currentView === 'splashscreen') {
      return (
        <div>
          <SplashScreen onClick={() => ( this.setState({ currentView: 'songlist' }) ) } />
        </div>
      );
    } else if (this.state.currentView === 'songlist') {
      return (
        <div>
          <SongList onStream={() => ( this.setState({ currentView: 'streaming' }) ) } />
          <Player />
        </div>
      );
    } else if (this.state.currentView === 'streaming') {
      return (
        <div>
          <Streaming onBack={() => ( this.setState({ currentView: 'songlist' }) ) } />
        </div>
      );
    } else {
      return (
        <div>
          ERROR, view not selected.
        </div>
      )
    }
  }
}

export default App;
