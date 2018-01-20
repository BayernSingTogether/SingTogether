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
    this.downloadSongAndLyrics = this.downloadSongAndLyrics.bind(this)
    this.downloadSong = this.downloadSong.bind(this)
    this.downloadLyrics = this.downloadLyrics.bind(this)
    this.setPlayingSong = this.setPlayingSong.bind(this)
    this.playAudio = this.playAudio.bind(this)
    
    this.state = {
      currentView: 'splashscreen',
      currentTime: 0,
      currentVote: null,
      songs: [],
      playingStarted: null,
      playingSong: null,
      nextSong: null,
      nextSongBlob: null,
      currentLine: 0,
      lyrics: [],
      nextLyrics: [],
      currentTime: 0,
    }

    const x = setInterval(() => {
      this.getSongsList()
      this.getPlayingSong()
      
      /// TEST MOCKUP
      this.setState({
        currentTime: this.state.currentTime + 1.5
      })
    }, 1500);
    
    this.serverTime = window.ServerDate()
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
      const playingStarted = parseInt((response.data || {}).room_playing_song_timestrap, 10)
      const playingSong = parseInt((response.data || {}).room_playing_song_id)
      const nextSong = parseInt((response.data || {}).room_next_song_id)
      
      if (playingStarted !== this.state.playingStarted && this.state.songs.length !== 0) {
        if (playingSong === this.state.nextSong) {
          this.setState({
            lyrics: this.state.nextLyrics
          })
          this.setPlayingSong(this.state.nextSongBlob)
          this.playAudio(playingStarted)
          this.downloadSongAndLyrics('next', this.state.songs.find((item) => (item.song_id === nextSong)) || {})
        } else {
          this.downloadSongAndLyrics('current', this.state.songs.find((item) => (item.song_id === playingSong)) || {})
          this.downloadSongAndLyrics('next', this.state.songs.find((item) => (item.song_id === nextSong)) || {})
        }

        this.setState({
          playingStarted,
          playingSong,
          nextSong,
        })
      }
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
  
  setPlayingSong (blob) {
    this.audio.src = window.URL.createObjectURL(blob)
  }
  
  downloadSongAndLyrics (songType, songData) {
    this.downloadSong(songType, `/public/${songData.song_file}`)
    this.downloadLyrics(songType, `/public/${songData.song_lyric}`)
  }

  downloadSong (songType, url) {
    axios.get(url, { responseType: 'blob' })
    .then((response) => {
      if (songType === 'current') {
        this.setPlayingSong(response.data)
      } else {
        this.setState({
          nextSongBlob: response.data
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  downloadLyrics (songType, url) {
    this.setState({
      lyrics: []
    })

    axios.get(url)
    .then((response) => {
      if (songType === 'current') {
        let currentLine = false
        response.data.forEach((item, i) => {
          if (currentLine === false && item[0] > this.state.currentTime) {
            currentLine = i
          }
        })

        this.setState({
          lyrics: response.data || [],
          currentLine,
        })
      } else {
        this.setState({
          nextLyrics: response.data || [],
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  playAudio () {
    console.log('server time', this.state.playingStarted, 'local time', this.serverTime)
    
    this.audio.play()
    
    const time = this.serverTime.valueOf() - this.state.playingStarted
    this.audio.currentTime = time / 1000
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.currentView === 'splashscreen') {
            return (
              <div>
                <SplashScreen onClick={() => {
                  this.setState({ currentView: 'songlist' })
                  this.playAudio()
                }} />
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
                  currentLine={this.state.currentLine}
                  lyrics={this.state.lyrics}
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
        })()}
        <audio ref={(ref) => (this.audio = ref)} />
      </div>
    )
  }
}

export default App;
