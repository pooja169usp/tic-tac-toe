import React from "react";

function Block(props) {
  return(
    <button id={ props.id } className="block" onClick = { props.changeTurn }>
      { props.turn }
    </button>
  );
}

export default Block;