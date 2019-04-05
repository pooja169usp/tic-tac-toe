import React, { Component } from "react";
import Block from "./Block";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerXTurn: true, // In this game the first turn will be of Player X
      blocks: Array(9).fill(null) // Initializing 9 elememts for 9 blocks to null
    }
  }

  // Render the blocks on the board with the passed in blockId
  buildBLock(blockId) {
  return (
    <Block turn={ this.state.blocks[blockId] } changeTurn={ () => this.changeTurn(blockId) } />
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
    for(let i = 0; i < winningPatterns.length; i++) {
      var pattern = winningPatterns[i];
      if(blocks[pattern[0]] && blocks[pattern[0]] === blocks[pattern[1]] && blocks[pattern[0]] === blocks[pattern[2]]) {
        return blocks[pattern[0]];
      }
    }
    return this.countTheRemainingEmptyBlocks(blocks) === 1 ? "draw": false;
  }

  countTheRemainingEmptyBlocks(blocks) {
    var counts = {};

    for (var i = 0; i < blocks.length; i++) {
      var num = blocks[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts[null];
  }

  render() {
    var winner = this.findTheWinner(this.state.blocks);
    var gameStatus;
    if(winner) {
      if(winner === "draw") {
        gameStatus = "That's a draw!"
      }
      else {
        gameStatus = "Winner is: ";
        gameStatus += winner == "X" ? this.props.playerX: this.props.playerO;
      }
    }
    else {
      gameStatus = this.state.isPlayerXTurn ? "Next Player: " + this.props.playerX : "Next Player: " + this.props.playerO;
    }
    return (
      <div id="board">
        <div id="gameStatus"> { gameStatus } </div>
        <div className="row">
          { this.buildBLock(0) }
          { this.buildBLock(1) }
          { this.buildBLock(2) }
        </div>
        <div className="row">
          { this.buildBLock(3) }
          { this.buildBLock(4) }
          { this.buildBLock(5) }
        </div>
        <div className="row">
          { this.buildBLock(6) }
          { this.buildBLock(7) }
          { this.buildBLock(8) }
        </div>
      </div>
    );
  }
}