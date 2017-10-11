
class Game {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex){
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
            console.log('Game Over');
            this._board.print();
        } else if (!this._board.hasSafeTiles){
            console.log('Great. You won the game.');
        } else {
            console.log('Current board:');
            this._board.print();
        }
    }
}

class Board {
    constructor (numberOfRows, numberOfColumns, numberOfBombs) {
        /*this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;*/
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile (rowIndex, columnIndex) {
        const coordinates = this._playerBoard[rowIndex][columnIndex];
        if (coordinates !== ' '){
            console.log('This tile has already been flipped');
            return
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles -=1;
    }

    getNumberOfNeighborBombs (rowIndex, columnIndex) {
            const neighborOffsets = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            const numberOfRows = this._bombBoard.length;
            const numberOfColumns = this._bombBoard[0].length;
            let numberOfBombs = 0;
            neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                    this._numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    hasSafeTiles(){
        return (this._numberOfTiles !== this._numberOfBombs);
    }

    print(){
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns){
        let board = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            let row = [];
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
        let board = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            let row = [];
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                row.push(null);
            }
            board.push(row);
        }
        let numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            // bombs may be placed twice on the same spot fix that with control flow
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }

}

const g = new Game(3,3,1);
g.playMove(0,1);

