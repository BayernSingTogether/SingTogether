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
    
    this.getSongsList = this.getSongsList.bind(this)
    this.postVote = this.postVote.bind(this)
    this.getPlayingSong = this.getPlayingSong.bind(this)
    
    this.state = {
      currentView: 'splashscreen',
      currentTime: 0,
      currentVote: null,
      songs: [],
      playingStarted: null,
      playingSong: null,
    }

    const x = setInterval(() => {
      this.getSongsList()
      
      /// TEST MOCKUP
      this.setState({
        currentTime: this.state.currentTime + 1
      })
    }, 1000);
    
    this.getPlayingSong();
  }
  
  getSongsList () {
    axios.get('/api/v1/get_song_list.php')
    .then((response) => {
      this.setState({
        songs: ((response.data || {}).list || [])
          .map((item) => {
            item.song_vote = parseInt(item.song_vote, 10)
            item.song_id = parseInt(item.song_id, 10)
            return item
          })
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  getPlayingSong () {
    axios.get('/api/v1/get_playing_song.php')
    .then((response) => {
      this.setState({
        playingStarted: parseInt((response.data || {}).soom_playing_song_timestrap, 10),
        playingSong: parseInt((response.data || {}).room_playing_song_id)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  postVote (songId) {
    axios.get(`/api/v1/vote.php?song_id=${songId}`)

    this.setState({
      currentVote: songId
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
            currentVote={this.state.currentVote}
            postVote={this.postVote}
          />
          <Player
            currentTime={this.state.currentTime}
            currentSong={this.state.songs.find((item) => (item.song_id === this.state.playingSong)) || {}}
            playingStarted={this.state.playingStarted}
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
