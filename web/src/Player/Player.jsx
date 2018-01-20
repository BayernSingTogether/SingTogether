import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  render() {
    return (
      <nav class="playing">
          <div class="playing__song">
              <div class="playing__artist">Sebas</div>
              <div class="playing__name">Passito a passito</div>
          </div>
          <div class="playing__lyrics">
              <div class="playing__lyrics__line">Hello!!</div>
              <div class="playing__lyrics__line playing__lyrics__line--current">I'm lyrics</div>
              <div class="playing__lyrics__line">For you to sing!</div>
          </div>
      </nav>
    );
  }
}

export default Player;
