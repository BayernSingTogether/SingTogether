import React, { Component } from 'react';
import './SongList.css';

class SongList extends Component {
  render() {
    return (
      <article>
        <ul class="list">
          {this.props.songs
            .sort((a, b) => (b.votes - a.votes))
            .map((item, i) => {
            return (
              <li key={item.id} class="list__item">
                <div class="list__item__f">
                  <div class="list__item__position">{i + 1}</div>
                  <div class="list__item__votes">{item.votes}</div>
                </div>
                <div class="list__item__s">
                  <div class="list__item__artist">{item.artist}</div>
                  <div class="list__item__name">{item.song_name}</div>
                </div>
              </li>
            )
          })}
          <li class="list__bottom"></li>
        </ul>
      </article>
    );
  }
}

export default SongList;
