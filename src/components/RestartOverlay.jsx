import React from "react";

function RestartOverlay(props) {
  return(
    <div id="gameRestartOverlay" style={{ backgroundImage: props.backgroundImage }}>
      <div id="winnerStatus"> { props.gameStatus } </div>
      <div><button className="restartButton" onClick={ props.restartGame }>Restart Game</button></div>
    </div>
  );
}

export default RestartOverlay;