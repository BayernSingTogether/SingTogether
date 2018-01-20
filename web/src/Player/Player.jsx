import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props)
    
    let currentLine = false
    this.props.lyrics.forEach((item, i) => {
      if (currentLine === false && item[0] > this.props.currentTime) {
        currentLine = i
      }
    })
    
    this.state = {
      currentLine,
    }
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
    }

    if (nextProps.lyrics.length !== this.props.lyrics.length) {
      shouldUpdate = true
    }
    
    return shouldUpdate
  }
  
  render() {
    return (
      <nav class="playing">
        <div class="playing__song">
          <div class="playing__artist">{this.props.currentSong.artist}</div>
          <div class="playing__name">{this.props.currentSong.song_name}</div>
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
