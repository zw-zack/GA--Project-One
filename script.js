
window.onload = function(){

	//function for hiding start page
	function hideStartPage() {
		document.getElementsByClassName("startPage")[0].style.display = "none";
	}

	//function for start button
	function button() {
		var startButton = document.getElementsByTagName("button")[0]
		startButton.addEventListener('click', whenStartButtonClicked);
	}
	button();

	//After start button pressed: hide start page and start the game
	function whenStartButtonClicked() {
		hideStartPage();
		gameStart();
	}

	function gameStart(){
		document.getElementsByClassName("gameStarted")[0].style.display = "block";
	}
























}