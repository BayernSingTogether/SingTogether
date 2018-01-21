import React, { Component } from 'react';

import './SplashScreen.css';

class SplashScreen extends Component {
  constructor(props) {
    super(props)
    
    this.handleClick = this.handleClick.bind(this)
    
    this.state = {
      syncstate: 0,
      clicked: false,
    }
    
    setTimeout(() => { this.setState({ syncstate: 1 }) }, 1000)
    setTimeout(() => { this.setState({ syncstate: 2 }) }, 2000)
    setTimeout(() => { this.setState({ syncstate: 3 }) }, 3000)
    setTimeout(() => { this.setState({ syncstate: 4 }) }, 4000)
    setTimeout(() => { this.setState({ syncstate: 5 }) }, 5000)
    setTimeout(() => { this.setState({ syncstate: 6 }) }, 6000)
    setTimeout(() => { this.setState({ syncstate: 7 }) }, 7000)
    setTimeout(() => { this.setState({ syncstate: 8 }) }, 8000)
    setTimeout(() => { this.setState({ syncstate: 9 }) }, 9000)
    setTimeout(() => { this.setState({ syncstate: false }) }, 10000)
  }
  
  handleClick () {
    if (this.state.syncstate === false) {
      this.setState({
        clicked: true
      })
      this.props.onClick()
    }
  }

  render() {
    return (
      <div
        className={
          this.state.clicked ?
          'splashScreen splashScreen--anim' : 'splashScreen'
        }
        onClick={this.handleClick}
      >
        <div className="loadContainer">
          <div className="loadSentence">
            {(() => {
              switch(this.state.syncstate) {
                case 0: return 'Syncronizing...🤨'
                case 1: return 'Syncronizing...😯'
                case 2: return 'Syncronizing...😧'
                case 3: return 'Syncronizing...😮'
                case 4: return 'Syncronizing...😲'
                case 5: return 'Syncronizing...😴'
                case 6: return 'Syncronizing...😪'
                case 7: return 'Syncronizing...😡'
                case 8: return 'Syncronizing...🤬'
                case 9: return 'Syncronizing...🤯'
                default: return '👉Klick hier👈'
              }
            })()}
          </div>
          {
            this.state.syncstate !== false ?
            (<div className="loading"></div>) 
            : undefined
          }
        </div>
        <div
          className={
            this.state.clicked ?
            'centerTitle centerTitle--anim' : 'centerTitle'
          }
        >
            <span className="title2">Sing Together</span><br/>
            <span className="title1">FC BAYERN</span>
        </div>
        <div
          className={
            this.state.clicked ?
            'bottomContent bottomContent--anim' : 'bottomContent'
          }
        >
          <img className="bothImgs bottomImg" src="/public/bottom.png"></img>
          <div className="bottomDiamonds">
            <div style={{ left:-25, bottom: 15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom: 15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom: 15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom: 15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom: 100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom: 100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom: 100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom: 100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom: 185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom: 185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom: 185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom: 185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom: 270 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom: 270 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom: 355 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.clicked ?
            'topContent topContent--anim' : 'topContent'
          }
        >
          <div className="topDiamonds">
            <div style={{ left:50, bottom:-155 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom:-70 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom:-70 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom:15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom:15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom:15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom:15 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom:100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom:100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom:100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom:100 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:-25, bottom:185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:0, bottom:185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:25, bottom:185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style={{ left:50, bottom:185 }} className="diamondContainer">
              <div className="diamond"></div>
            </div>
          </div>
          <img className="bothImgs topImg" src="/public/top.png"></img>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
