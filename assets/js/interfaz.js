'use strict';
$(".cs-izquierda button").click(function (event) {
	event.preventDefault();
	$("button.manual").removeClass("active");
	$("button.api").removeClass("active");
	$(this).addClass("active");
});
$("#btnPlay").click(function (event) {
	event.preventDefault();
	$(this).addClass("inactive");
	$("#btnPause").removeClass("inactive");
});

$("#btnPause").click(function (event) {
	event.preventDefault();
	$(this).addClass("inactive");
	$("#btnPlay").removeClass("inactive");
});

$("#btnEraser").click(function (event) {
	event.preventDefault();
	$("#btnPause").addClass("inactive");
	$("#btnPlay").removeClass("inactive");
	interfaz.drawBoard();
});


$("#txtRows").change(function (event) {
	event.preventDefault();
	interfaz.changeBoardSize($(this).val(), $("#txtCols").val() );
});
$("#txtCols").change(function (event) {
	event.preventDefault();
	interfaz.changeBoardSize($("#txtRows").val(), $(this).val() );
});
$("#txtDelay").change(function (event) {
	event.preventDefault();
	interfaz.board.updateMillis(parseInt($(this).val()));
});

$(".cuadricula").on("click", ".cuadro",function (event) {
	event.preventDefault();
	$(this).toggleClass("active");
	const id = $(this).attr("id");
	const colStart = id.indexOf("c");
	interfaz.board.toggleBox(id.substr(1,colStart-1), id.substr(colStart+1));
});

class Interfaz{

	constructor(rows, cols, millis) {
	    this.rows = rows;
	    this.cols = cols;
	    this.millis = millis;
	    this.drawBoard();
	}
	drawBoard(){
	    this.board = new Board(this.rows, this.cols, this.millis);
		$.when(this.startDrawBoard()).then(this.showBoard());
	}
	startDrawBoard(){
		$(".cuadricula").attr("style", "display: none;");
		$(".cuadricula").empty();
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				$(".cuadricula").append(`<div id="r${i}c${j}" class="cuadro bg-muerto"></div>`);
			}
		}
	}
	showBoard(){
		$(".cuadricula").attr("style", "display: grid;");
		$(".cuadricula").attr("style","grid-template-columns: repeat("+this.cols+", 1fr) !important;");
		$(".cuadro").attr("style","height: "+($(".cuadro").width())+"px !important;");
	}
	changeBoardSize(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.board = new Board(rows, cols);
		$.when(this.drawBoard()).then(this.showBoard());
	}

	nextStep(){
		this.board.nextStep();
	}
}

const interfaz = new Interfaz(3,3, 1000);

window.onmousemove = function (){
    const diff = $(window).height() - window.event.clientY;
    if (diff < $(".controles-inferiores").height() + 40) 
    	$(".controles-inferiores").removeClass("hidden");
  	else
    	$(".controles-inferiores").addClass("hidden");
}