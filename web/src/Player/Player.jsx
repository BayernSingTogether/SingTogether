import React, { Component } from 'react'
import axios from 'axios'

import './Player.css'

class Player extends Component {
  render() {
    return (
      <nav class="playing">
        <div class="playing__song">
          <div class="playing__artist">{this.props.currentSong.song_artist}</div>
          <div class="playing__name">{this.props.currentSong.song_name}</div>
          <div class="playing__ball" style={{ left: window.innerWidth * this.props.currentTime / parseFloat(this.props.currentSong.song_length) }} />
        </div>
        <div class="playing__lyrics">
          <div class="playing__lyrics__scroll" style={{ marginTop: 20-29*this.props.currentLine }}>
            {this.props.lyrics.map((item, i) => {
              if (this.props.currentLine === i) {
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
