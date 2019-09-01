'use strict';

var millis;
var board;


class Board{

	constructor(rows, cols, millis) {
	    this.rows = rows;
	    this.cols = cols;
	    this.millis = millis;
	    this.completeFirstBoard;
	    this.completeSecondBoard;
	    this.status = false;
	    this.timer;
	    this.createBoards();
	}

	setMillis(millis){
		this.millis = millis;
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

	updateMillis(newValue){
		this.millis = newValue;
		//Aqui mas bien jala directo el valor del input
	}

	play(status = true, consol = "defecto"){
		this.status = status;
		if ((this.millis > 100 && status == true) || status == false) {
			for (let i = 0; i < this.rows; i++) 
				for (let j = 0; j < this.cols; j++) 
					this.completeSecondBoard[i][j] = this.aliveNeighbors(i, j);
			this.cloneBoard(this.completeFirstBoard, this.completeSecondBoard);
			this.clearBoard(this.completeSecondBoard);
			console.log(consol);
			if (this.status)
				this.timer = setTimeout('nuevo.play()', this.millis);
		}else{
			console.error("Millis doesn't have a required value!");
		}
		
	}
	stop(){
		clearTimeout(this.timer);
	}

	nextStep(){
		this.stop();
		this.play(false, "bnuevp valor");
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

	createBoardFromAPI(){
		return new Promise((done, reject) => {
			var req = new XMLHttpRequest();
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4) 
					if(req.status == 200)
						done(req.responseText);
					else
						reject(req.status);
			};
			req.open('GET', 'https://api.noopschallenge.com/automatabot/rules/conway/random/', true);
			req.send();
		})
		.then((cadena) => {
			var jsonBoard = JSON.parse(cadena).cells;
			this.rows = Object.keys(jsonBoard).length;
			this.cols = jsonBoard[0].length;
			this.fillFromJson(jsonBoard);
		})
		.catch((msg) => {
			console.log("Error resolviendo el API, error: " + msg);
		});
	}

	fillFromJson(json){
		//recorrer el json
		//e ir llenando el nuevo tablero
	}
}


function manualStart(){
	//jalar los datos del millis, row y col
	//enviarlos al nuevo objeto que se cree
	board = new Board(10, 4, 1000);
}


function apiStart(){
	//jalar los datos del millis
	//enviar millis al nuevo objeto que se cree
	board = new Board(0, 0, 1000);
	board.createBoardFromAPI();
}




