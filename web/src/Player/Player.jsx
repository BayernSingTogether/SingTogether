import React, { Component } from 'react'
import axios from 'axios'

import './Player.css'

class Player extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      currentLine: null
    }
  }

  componentWillUpdate (nextProps, nextState) {
    let found = false
    nextProps.lyrics.forEach((item, i) => {
      if (found === false && item[0] >= nextProps.currentTime) {
        found = true
        if (this.state.currentLine !== i - 1) {
          this.setState({
            currentLine: i - 1,
          })
        }
      }
    })
  }

  render() {
    return (
      <nav className="playing">
        <div className="playing__song">
          <div className="playing__artist">{this.props.currentSong.song_artist}</div>
          <div className="playing__name">{this.props.currentSong.song_name}</div>
          <div className="playing__ball" style={{ left: (window.innerWidth - 10) * (this.props.currentTime || 0) / parseFloat((this.props.currentSong.song_length ||1 )) }} />
        </div>
        <div className="playing__lyrics">
          <div className="playing__lyrics__scroll" style={{ marginTop: 20-29*this.state.currentLine }}>
            {this.props.lyrics.map((item, i) => {
              if (this.state.currentLine === i) {
                return (
                  <div key={i} className="playing__lyrics__line playing__lyrics__line--current">{item[1]}</div>
                )
              } else {
                return (
                  <div key={i} className="playing__lyrics__line">{item[1]}</div>
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
