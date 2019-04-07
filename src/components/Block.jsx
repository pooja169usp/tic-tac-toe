import React, { Component } from "react";

export default class Block extends Component {

  render() {
    return(
      <button id={ this.props.id } className="block" onClick = { this.props.changeTurn }>
        { this.props.turn }
      </button>
    );
  }
}