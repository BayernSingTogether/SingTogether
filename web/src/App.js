import React, { Component } from 'react'
import request from 'request'
import axios from 'axios'

import SplashScreen from './SplashScreen/SplashScreen'
import SongList from './SongList/SongList'
import Player from './Player/Player'
import Streaming from './Streaming/Streaming'

import './App.css';


class App extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      currentView: 'splashscreen',
      currentTime: 0,
      songs: [],
    }

    const x = setInterval(() => {
      this.getSongsList()
      
      /// TEST MOCKUP
      this.setState({
        currentTime: this.state.currentTime + 1
      })
    }, 1000);
  }
  
  getSongsList () {
    axios.get('/get_song_list.php')
    .then(function (response) {
      console.log(response)
      this.setState({
        songs: response.data
      })
    })
    .catch(function (error) {
      console.log(error)
    })
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
          <SongList
            onStream={() => ( this.setState({ currentView: 'streaming' }) ) }
            songs={this.state.songs}
          />
          <Player
            currentTime={this.state.currentTime}
            currentSong={{ id: 1, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 0 }}
            lyrics={[
              [1, 'Hey there'],
              [2, 'I\'m sebas'],
              [4, 'I\'m amazing'],
              [5, 'I have stickers on my laptop'],
              [8, 'But what stickers'],
              [12, 'They are not normal'],
              [13, 'THEY'],
              [14, 'ARE'],
              [15, 'FIRKIN'],
              [16, 'GITHUB'],
              [17, 'STICKERS'],
              [18, '!!!!!!!'],
              [19, 'men'],
            ]}
          />
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
