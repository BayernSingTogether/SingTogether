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
      currentView: 'splashscreen',
      currentTime: 0,
    }
    
    
    /// TEST MOCKUP
    const x = setInterval(() => {
      this.setState({
        currentTime: this.state.currentTime + 1
      })

      // If the count down is finished, write some text 
      if (this.state.currentTime > 50) {
        clearInterval(x);
      }
    }, 1000);
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
            songs={[
              { id: 1, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 0 },
              { id: 2, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 3, artist: 'Pep', song_name: 'Github sticker remix', votes: 100 },
              { id: 4, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 5, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 6, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 2 },
              { id: 7, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 300 },
              { id: 8, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 9, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 10, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 11, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 12, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
              { id: 13, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 1 },
              { id: 14, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 0 },
              { id: 15, artist: 'Sebas to loko', song_name: 'Github sticker fest', votes: 3 },
            ]}
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
