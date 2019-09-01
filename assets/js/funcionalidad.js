'use strict';

class Board{

	constructor(rows, cols) {
	    this.rows = rows;
	    this.cols = cols;
	    this.completeFirstBoard;
	    this.completeSecondBoard;
	    this.createBoards();
	}

	createBoards() {
		var completeFirstBoard = new Array(this.rows);
		var completeSecondBoard = new Array(this.rows);
	    for (let i = 0; i < this.rows; i++) {
			completeFirstBoard[i] = new Array(this.cols);
			completeSecondBoard[i] = new Array(this.cols);
			for (let j = 0; j < this.cols; j++) {
				completeFirstBoard[i][j] = 0;
				completeSecondBoard[i][j] = 0;
			}
	    }
	    this.completeFirstBoard = completeFirstBoard;
	    this.completeSecondBoard = completeSecondBoard;
	}

	toggleBox(row, col){
		this.completeFirstBoard[row][col] = (this.completeFirstBoard[row][col] + 1) % 2;
	}

	clearBoard(board){
		for (let i = 0; i < this.rows; i++) 
			for (let j = 0; j < this.cols; j++) 
				board[i][j] = 0;
	}

	play(){
		for (let i = 0; i < this.rows; i++) 
			for (let j = 0; j < this.cols; j++) 
				this.completeSecondBoard[i][j] = this.aliveNeighbors(i, j);

		this.cloneBoard(this.completeFirstBoard, this.completeSecondBoard);
		this.clearBoard(this.completeSecondBoard);
	}

	cloneBoard(paste, copy){
		for (let i = 0; i < this.rows; i++) 
			for (let j = 0; j < this.cols; j++) 
				paste[i][j] = copy[i][j];
	}

	aliveNeighbors(n, m){
		var alive = 0;
		alive += this.completeFirstBoard[this.down(n, this.rows)][this.down(m, this.cols)];
		alive += this.completeFirstBoard[this.down(n, this.rows)][m];
		alive += this.completeFirstBoard[this.down(n, this.rows)][this.up(m, this.cols)];
		alive += this.completeFirstBoard[n][this.down(m, this.cols)];
		alive += this.completeFirstBoard[n][this.up(m, this.cols)];
		alive += this.completeFirstBoard[this.up(n, this.rows)][this.down(m, this.cols)];
		alive += this.completeFirstBoard[this.up(n, this.rows)][m];
		alive += this.completeFirstBoard[this.up(n, this.rows)][this.up(m, this.cols)];

		return this.applyRules(this.completeFirstBoard[n][m], alive);
	}

	applyRules(cell, aliveNeighbors){
		
		if (cell == 1 && (aliveNeighbors == 2 || aliveNeighbors == 3)) {
			cell = 1;
		}else if (cell == 0 && aliveNeighbors == 3) {
			cell = 1;
		}else{
			cell = 0;
		}

		return cell;
	}

	down(pos, max){
		return ((pos - 1) + max) % max;
	}

	up(pos, max){
		return ((pos + 1) + max) % max;
	}
}


var nuevo = new Board(10,4);
con(nuevo);


























function con(argument) {
	console.log(argument);
}