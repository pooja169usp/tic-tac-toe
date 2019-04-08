import React, { Component } from "react";

export default class RestartOverlay extends Component {

  render() {
    return(
      <div id="gameRestartOverlay" style={{ backgroundImage: this.props.backgroundImage }}>
        <div id="winnerStatus"> { this.props.gameStatus } </div>
        <div><button className="restartButton" onClick={ this.props.restartGame }>Restart Game</button></div>
      </div>
    );
  }
}