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
        <h3> TIC TAC TOE </h3>
        <div className="players">
          <div>Player X: <input type="text" id="playerX" placeholder="Player X" onChange={this.updatePlayer.bind(this)} value={this.state.playerX} maxLength="20" autoComplete={"off"}/></div>
          <div>Player O: <input type="text" id="playerO" placeholder="Player O" onChange={this.updatePlayer.bind(this)} value={this.state.playerO} maxLength="20" autoComplete={"off"}/></div>
        </div>
        <div className="app-board">
          <Board playerX={ this.state.playerX } playerO={ this.state.playerO } />
        </div>
      </div>
    );
  }
}

