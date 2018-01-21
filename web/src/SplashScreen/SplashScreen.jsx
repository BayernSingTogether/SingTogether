import React, { Component } from 'react';

import './SplashScreen.css';

class SplashScreen extends Component {
  constructor(props) {
    super(props)
    
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
      <div onClick={this.handleClick}>
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
                default: '👉Klick hier👈'
              }
            })()}
          </div>
          {
            this.state.syncstate === false ?
            (<div className="loading"></div>) 
            : undefined
          }
        </div>
        <div
          className={{
            this.state.clicked ?
            'centerTitle centerTitle--anim' : 'centerTitle'
          }}
        >
            <span className="title2">Sing Together</span>
            <span className="title1">FC BAYERN</span>
        </div>
        <div
          className={{
            this.state.clicked ?
            'bottomContent bottomContent--anim' : 'bottomContent'
          }}
        >
          <img className="bothImgs bottomImg" src="bottom.png"></img>
          <div className="bottomDiamonds">
            <div style="left:-25px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:270px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:270px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:355px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
          </div>
        </div>
        <div
          className={{
            this.state.clicked ?
            'topContent topContent--anim' : 'topContent'
          }}
        >
          <div className="topDiamonds">
            <div style="left:50px;bottom:-155px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:-70px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:-70px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:15px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:100px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:-25px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:0px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:25px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
            <div style="left:50px;bottom:185px;" className="diamondContainer">
              <div className="diamond"></div>
            </div>
          </div>
          <img className="bothImgs topImg" src="top.png"></img>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
