import React, { Component } from 'react';
import './SongList.css';

class SongList extends Component {
  render() {
    return (
      <article>
        <ul className="list">
          {this.props.songs
            .sort((a, b) => (b.song_vote - a.song_vote))
            .map((item, i) => {
            return (
              <li
                key={item.song_id}
                className={`list__item ${item.song_id === this.props.currentVote ? 'list__item--voted' : ''}`}
                onClick={() => (this.props.postVote(item.song_id))}
              >
                <div className="list__item__f">
                  {(() => {
                    if (item.song_id === this.props.nextSong) {
                      return (
                        <div className="next">NEXT</div>
                      )
                    } else {
                      return null
                    }
                  })()}
                </div>
                <div className="list__item__s">
                  <div className="list__item__position">{i + 1}</div>
                  <div className="list__item__votes">{item.song_vote}</div>
                </div>
                <div className="list__item__t">
                  <div className="list__item__artist">{item.song_artist}</div>
                  <div className="list__item__name">{item.song_name}</div>
                </div>
              </li>
            )
          })}
          <li className="list__bottom"></li>
        </ul>
      </article>
    );
  }
}

export default SongList;
