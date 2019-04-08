import React, { Component } from "react";
import Block from "./Block";
import RestartOverlay from "./RestartOverlay";

// This is the main component of the App. It displays the board with blocks in it that compose the game.
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerXTurn: true, // In this game, the first turn will be of Player X
      blocks: Array(9).fill(null) // Initializing 9 elememts for 9 blocks to null
    }
  }

  // Render the blocks on the board with the passed in blockId
  buildBLock(blockId) {
  return (
    <div className="row">
      <Block id={ "block" + blockId } turn={ this.state.blocks[blockId] } changeTurn={ () => this.changeTurn(blockId) } />
      <Block id={ "block" + (blockId + 1) } turn={ this.state.blocks[blockId + 1] } changeTurn={ () => this.changeTurn(blockId + 1) } />
      <Block id={ "block" + (blockId + 2) } turn={ this.state.blocks[blockId + 2] } changeTurn={ () => this.changeTurn(blockId + 2) } />
    </div>
  );
  }

  // Mark the current player's move and pass the turn to opponent player
  changeTurn(blockId) {
    // Return if the winner has already been found
    if(this.findTheWinner(this.state.blocks)) {
      return;
    }
    // Allow a move only if the block is empty
    if(this.state.blocks[blockId] === null) {
      const tempBlocks = this.state.blocks.slice();
      tempBlocks[blockId] = this.state.isPlayerXTurn ? "X" : "O";
      this.setState({
        blocks: tempBlocks,
        isPlayerXTurn: !this.state.isPlayerXTurn
      });
      // Gray the filled blocks to indicate to the user that the block has already been played and cannot be changed
      document.getElementById( "block" + blockId) .style.backgroundColor = "lightgray";
    }
  }

  // Find out if we have a winner
  findTheWinner(blocks) {
    const winningPatterns = [
      // horizontal blocks
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical blocks
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal blocks
      [0, 4, 8],
      [2, 4, 6],
    ];
    // For each winning pattern above check if each block contains the same value and return the winner
    for(let i = 0; i < winningPatterns.length; i++) {
      var pattern = winningPatterns[i];
      if(blocks[pattern[0]] && blocks[pattern[0]] === blocks[pattern[1]] && blocks[pattern[0]] === blocks[pattern[2]]) {
        return blocks[pattern[0]];
      }
    }
    return typeof(this.countTheRemainingEmptyBlocks(blocks)) === "undefined" ? "draw": false;
  }

  // This method will return the number of empty blocks - We will use this to delare a draw if the winner has not been found
  countTheRemainingEmptyBlocks(blocks) {
    var counts = {};

    for (var i = 0; i < blocks.length; i++) {
      var num = blocks[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts[null];
  }

  // Once a winner is found or there is a draw, display an overlay with the winner and provide an option to restart the game
  restartGame() {
    this.setState({
      isPlayerXTurn: true, // Re-initialize the state of the board, so the game will be reset
      blocks: Array(9).fill(null) // Re-initializing 9 elememts for 9 blocks to null
    });
    var blocks = document.getElementsByClassName("block");
    for(var i = 0; i < blocks.length; i++)
    {
      blocks[i].style.backgroundColor = "white";
    }
  }

  render() {
    var winner = this.findTheWinner(this.state.blocks);
    var gameStatus;
    var isThereAWinner = false;
    if(winner) {
      if(winner === "draw") {
        gameStatus = "That's a draw!";
      }
      else {
        gameStatus = "Winner is: ";
        gameStatus += winner == "X" ? this.props.playerX ? this.props.playerX : "X" : this.props.playerO ? this.props.playerO : "O";
        isThereAWinner = true;
      }
    }
    else {
      gameStatus = "Next Player: ";
      gameStatus += this.state.isPlayerXTurn ? this.props.playerX ? this.props.playerX : "X" : this.props.playerO ? this.props.playerO : "O";
    }
    return (
      <div>
        {/** Check if the winner has been found already and display either the board or an overlay with the results and an option to restart the game **/}
        { !winner ?
          <div id="board">
            <button className="refresh" onClick={ this.restartGame.bind(this) }><i className="fa fa-refresh"><span id="reset-label">Reset</span></i></button>
            <div id="gameStatus"> { gameStatus } </div>
            { this.buildBLock(0) }
            { this.buildBLock(3) }
            { this.buildBLock(6) }
          </div> : isThereAWinner ?
          <RestartOverlay restartGame={ this.restartGame.bind(this) } gameStatus={ gameStatus } backgroundImage={ "url('../src/celebrate.gif')" } /> :
          <RestartOverlay restartGame={ this.restartGame.bind(this) } gameStatus={ gameStatus } backgroundImage={ "url('../src/tie.gif')" } />
        }
      </div>
    );
  }
}