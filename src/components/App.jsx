import React, { Component } from "react";
import Board from "./Board";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: "",
      playerO: "",
    };
  }

  updatePlayer(e) {
    if(e.target.id === "playerX") {
      this.setState({
        playerX: e.target.value
      })
    }
    if(e.target.id === "playerO") {
      this.setState({
        playerO: e.target.value
      })
    }
  }

  render() {
    return (
      <div className="tic-tac-toe">
        <div className="players">
          <div>Player X: <input id="playerX" onChange={this.updatePlayer.bind(this)} type="text" value={this.state.playerX} autoComplete={"off"}/></div>
          <div>Player O: <input id="playerO" onChange={this.updatePlayer.bind(this)} type="text" value={this.state.playerO} autoComplete={"off"}/></div>
        </div>
        <div className="game-board">
          <Board playerX={ this.state.playerX } playerO={ this.state.playerO } />
        </div>
      </div>
    );
  }
}

