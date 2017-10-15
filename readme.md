## Minesweeper 
Minesweeper is a single player game. The objective of the game is to clear a board 
with hidden mines without detonating any of them. 
This game can be played in the terminal only. 

### Installation 

1. Download the repository 
2. Open your terminal 
3. Navigate to /path/minesweeper/src 
4. Run `node` 
5. Run `.load game.js`
6. Create a new game instance and chose the size of the board (numberOfRows and numberOfColumns) as well as the difficulty (numberOfBombs) e.g. `let game = new Game (3,3,3);`
7. Make plays by telling the coordinates of the tiles you'll like to flip, e.g. run `game.playMove(0,1);`
8. When done run `.exit`