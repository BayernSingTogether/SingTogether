import React, { Component } from 'react'
import axios from 'axios'

import './Player.css'

class Player extends Component {
  constructor(props) {
    super(props)
    
    this.downloadSongAndLyrics = this.downloadSongAndLyrics.bind(this)
    this.downloadSong = this.downloadSong.bind(this)
    this.downloadLyrics = this.downloadLyrics.bind(this)
    
    let currentLine = false
    this.props.lyrics.forEach((item, i) => {
      if (currentLine === false && item[0] > this.props.currentTime) {
        currentLine = i
      }
    })
    
    this.state = {
      currentLine,
      lyrics: [],
      currentTime: 0,
    }

    if (this.props.currentSong) {
      this.downloadSongAndLyrics(this.props.currentSong)
    }
  }
  
  downloadSongAndLyrics (songData) {
    this.downloadSong(`/public/${songData.song_file}`)
    this.downloadLyrics(`/public/${songData.song_lyric}`)
  }

  downloadSong (url) {
    axios.get(url)
    .then((response) => {
      const song = URL.createObjectURL(response.data)
      
      this.audio.src = song
      this.audio.play()
      
      const time = performance.timing.navigationStart + performance.now() - this.props.playingStarted
      this.audio.currentTime = time / 1000
      
      console.log('Started at ', time, 'server time', this.props.playingStarted, 'local time', performance.timing.navigationStart + performance.now())
    })
    .catch((error) => {
      console.log(error)
    })
  }

  downloadLyrics (url) {
    this.setState({
      lyrics: []
    })

    axios.get(url)
    .then((response) => {
      this.setState({
        lyrics: response.data || []
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  
  shouldComponentUpdate (nextProps, nextState) {
    let shouldUpdate = false
    let found = false
    nextProps.lyrics.forEach((item, i) => {
      if (found === false && item[0] >= nextProps.currentTime) {
        found = true
        if (this.state.currentLine !== i) {
          shouldUpdate = true
          this.setState({
            currentLine: i,
          })
        }
      }
    })
    
    if (nextProps.currentSong.id !== this.props.currentSong.id) {
      shouldUpdate = true
      this.downloadSongAndLyrics(nextProps.currentSong)
    }

    if (nextProps.lyrics.length !== this.props.lyrics.length) {
      shouldUpdate = true
    }
    
    return shouldUpdate
  }
  
  render() {
    return (
      <nav class="playing">
        <audio ref={(ref) => (this.audio = ref)}/>
        <div class="playing__song">
          <div class="playing__artist">{this.props.currentSong.song_artist}</div>
          <div class="playing__name">{this.props.currentSong.song_name}</div>
          <div class="playing__ball" style={{ left: window.innerWidth * this.props.currentTime / parseFloat(this.props.currentSong.song_length) }} />
        </div>
        <div class="playing__lyrics">
          <div class="playing__lyrics__scroll" style={{ marginTop: 20-29*this.state.currentLine }}>
            {this.props.lyrics.map((item, i) => {
              if (this.state.currentLine === i) {
                return (
                  <div key={i} class="playing__lyrics__line playing__lyrics__line--current">{item[1]}</div>
                )
              } else {
                return (
                  <div key={i} class="playing__lyrics__line">{item[1]}</div>
                )
              }
            })}
          </div>
        </div>
      </nav>
    );
  }
}

export default Player;
