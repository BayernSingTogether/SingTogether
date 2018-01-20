import React, { Component } from 'react';
import './SongList.css';

class SongList extends Component {
  render() {
    return (
      <article>
        <ul class="list">
          {this.props.songs
            .sort((a, b) => (b.song_vote - a.song_vote))
            .map((item, i) => {
            return (
              <li
                key={item.song_id}
                class={`list__item ${item.song_id === this.props.currentVote ? 'list__item--voted' : ''}`}
                onClick={() => (this.props.postVote(item.song_id))}
              >
                <div class="list__item__f">
                  <div class="list__item__position">{i + 1}</div>
                  <div class="list__item__votes">{item.song_vote}</div>
                </div>
                <div class="list__item__s">
                  <div class="list__item__artist">{item.song_artist}</div>
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
