TIC TAC TOE
===================================

This app is a simple tic tac toe game that needs 2 players X and O. X is the first player and O is the second player. Depending on who wins, the winner is declared or if there is a draw, the app declares a draw and there is an option to restart the game.

Getting Started
==================

1. Download the zip file and extract it to your project location
2. Open your terminal and navigate to the extracted folder
3. Run the following commands to get started
#
	npm install -- This command installs the necessary dependencies for  building the app
	npm run watch -- This command will build the app and generate build folder with bundle.js
	npm start -- This command will start the app in a browser window


Components
==================

1. App.jsx - It is the root component that is rendered into the element id "root" in the index.html
2. Board.jsx - This is the main component that handles all the moving parts in this app. It builds the blocks using Block component. It also handles the state of the game and checks whose turn it is. It also provides functionality for restarting the game whenever the user wishes or when there is a winner or there is a draw/tie.
2. Board is another component that is reused to build the Board for this app.
