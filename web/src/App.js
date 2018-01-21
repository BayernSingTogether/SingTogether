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
    this.getUserVote = this.getUserVote.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this)
    
    this.state = {
      status: 'paused',
      currentView: 'splashscreen',
      currentTime: 0,
      currentVote: null,
      songs: [],
      playingStarted: null,
      playingSong: null,
      nextSong: null,
      nextSongBlob: null,
      lyrics: [],
      nextLyrics: [],
      timeOutGetPlayingSong: null,
    }
    
    this.hasPlayedThrough = false

    const x = setInterval(() => {
      this.getSongsList()
      
      /// TEST MOCKUP
      this.setState({
        currentTime: ((this.audio || {}).currentTime) || 0
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

      if (this.state.playingSong === null) {
        // console.log('playing song', this.state.playingSong)
        this.getPlayingSong()
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  getUserVote () {
    axios.get('/api/v1/get_my_vote.php')
    .then((response) => {
      this.setState({
        currentVote: parseInt((response.data || {}).user_vote) || null
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
      
      if (this.state.songs.length !== 0) {
        const currentSongDetails = this.state.songs.find((item) => (item.song_id === playingSong)) || {}
        if (playingStarted !== this.state.playingStarted) {

          if (playingSong === this.state.nextSong) {
            this.setState({
              lyrics: this.state.nextLyrics
            })
            
            this.setPlayingSong(this.state.nextSongBlob)
            this.hasPlayedThrough = false

            this.downloadSongAndLyrics('next', this.state.songs.find((item) => (item.song_id === nextSong)) || {})
          } else {
            this.downloadSongAndLyrics('current', currentSongDetails)
            this.downloadSongAndLyrics('next', this.state.songs.find((item) => (item.song_id === nextSong)) || {})
          }

          this.setState({
            playingStarted,
            playingSong,
            nextSong,
          })
          
          // Update vote
          this.getUserVote()
        }
        
        // Schedule next check
        clearTimeout(this.state.timeOutGetPlayingSong)
        this.setState({
          timeOutGetPlayingSong: setTimeout(
            () => {
              this.getPlayingSong()
            },
            (parseFloat(currentSongDetails.song_length) - (this.serverTime.valueOf() - playingStarted)/1000 + 0.5)*1000
          )
        })
      } else {
        // Schedule next check
        clearTimeout(this.state.timeOutGetPlayingSong)
        this.setState({
          timeOutGetPlayingSong: setTimeout(
            () => {
              this.getPlayingSong()
            },
            1*1000
          )
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
    axios.get(url)
    .then((response) => {
      if (songType === 'current') {
        this.setState({
          lyrics: response.data || [],
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
  
  playAudio (playingStarted) {
    if (this.state.status === 'playing') {
      // console.log('server time', playingStarted || this.state.playingStarted, 'local time', this.serverTime)
      
      this.audio.play()
    }
  }
  
  handlePause () {
    this.setState({
      status: 'paused',
    })
  }
  
  handlePlay () {
    this.setState({
      status: 'playing',
    })
    
    
    const time = this.serverTime.valueOf() - (this.state.playingStarted)
    this.audio.currentTime = time / 1000
    // console.log('go to second handlePlay', time / 1000)
    // console.log('readyState:', this.audio.readyState)
  }
  
  handleCanPlayThrough (e) {
    if (!this.hasPlayedThrough) {
      console.log('puedo reproducir', e.target.readyState)
      const time = this.serverTime.valueOf() - (this.state.playingStarted)
      console.log('go to second handlePlay', time / 1000)
      console.log('readyState:', this.audio.readyState)
      this.audio.currentTime = time / 1000
  
      this.hasPlayedThrough = true
    }
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.currentView === 'splashscreen') {
            return (
              <div>
                <SplashScreen onClick={() => {
                  this.state.status = 'playing'
                  this.setState({ status: 'playing' })
                  setTimeout(() => {
                    this.setState({ currentView: 'songlist' })
                  }, 1000)
                  this.playAudio()
                }} />
                <SongList
                  onStream={() => ( this.setState({ currentView: 'streaming' }) ) }
                  songs={this.state.songs}
                  currentVote={this.state.currentVote}
                  postVote={this.postVote}
                  playingSong={this.state.playingSong}
                  nextSong={this.state.nextSong}
                />
                <Player
                  currentTime={this.state.currentTime}
                  currentSong={this.state.songs.find((item) => (item.song_id === this.state.playingSong)) || {}}
                  lyrics={this.state.lyrics}
                />
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
                  playingSong={this.state.playingSong}
                  nextSong={this.state.nextSong}
                />
                <Player
                  currentTime={this.state.currentTime}
                  currentSong={this.state.songs.find((item) => (item.song_id === this.state.playingSong)) || {}}
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
        <audio
          ref={(ref) => { this.audio = ref; window.aaa = ref }}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onLoad={this.handleLoadMetadata}
          // onCanPlayThrough={this.handleCanPlayThrough}
        />
      </div>
    )
  }
}

export default App;
