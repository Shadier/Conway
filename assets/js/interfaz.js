$(".cs-izquierda button").click(function (event) {
	event.preventDefault();
	$("button.manual").removeClass("active");
	$("button.api").removeClass("active");
	$(this).addClass("active");
});