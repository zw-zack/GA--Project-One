function hideStartPage() {
	document.getElementsByClassName("startPage")[0].style.display = "none";
}

function button() {
	var startButton = document.getElementsByTagName("button")[0]
	startButton.addEventListener('click', whenStartButtonClicked);
}
button();

function whenStartButtonClicked() {
	hideStartPage();
	gameStart();
}


var myGamePiece;
var myBackground;
var myTiger;
var tigers = new Array(0);
var dinos = new Array(0);
var ghosts = new Array(0);
var cakes = new Array(0);

var myScore;

function gameStart() {
	document.getElementsByClassName("gameStarted")[0].style.display = "block";
	myGamePiece = new component(30, 30, "cat_image.png", 580, 300, "image", 1);
	myBackground = new component(1200, 700, "bgImage3.jpg", 0, 0, "image");
	myScore = new component("30px", "Consolas", "black", 1000, 40, "text");
	var time = 0;

	function timer(){
		time++
		if(time > 450){
			clearInterval(tigerInterval);
		}
		if(time > 50){
			clearInterval(dinoInterval);
		}
	}
	setInterval(timer, 1000);

	function makeTigers(){
		var myTiger = new enemyTypeOne(50, 50, "tiger.png", 30, 650*Math.random(), "image", 1);
		tigers.push(myTiger);
	}
	var tigerInterval = setInterval(function(){ makeTigers()} , 3000);

	function makeDinos(){
		var myDino = new enemyTypeTwo(70, 70, "dino.png", 1100, 650*Math.random(), "image", 1);
		dinos.push(myDino);
	}
	var dinoInterval = setInterval(makeDinos, 10000);

	function makeGhosts(){
		for(var i = 0; i<3 ; i++){
			var myGhost = new enemyTypeThree(60, 60, "ghost.png", 30, 650*Math.random(), "image", 1);
			ghosts.push(myGhost);
		}
	}
	setTimeout(makeGhosts, 20000);

	function makeCake(){
		var myCake = new friendliesTypeOne(20, 20, "cake.jpg", Math.random()*1100 , Math.random()* 550, "image", 1);
		cakes.push(myCake);
	}
	var cakeInterval = setInterval(makeCake, 5000);
	myGameArea.start();
}


var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 1200;
		this.canvas.height = 700;
		this.context = this.canvas.getContext("2d");
		document.getElementsByClassName("gameStarted")[0].insertBefore(this.canvas, document.getElementsByClassName("gameStarted")[0].childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function (e) {
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			myGameArea.keys[e.keyCode] = false; 
		})

	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		clearInterval(this.interval);
	}
}

function component(width, height, color, x, y, type,status) {
	this.status= status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;    
	this.x = x;
	this.y = y;    
	this.update = function() {
		ctx = myGameArea.context;
		if (type == "image") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		} 

		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}

	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;   

	}
	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if (mybottom < othertop ||
			mytop > otherbottom ||
			myright < otherleft ||
			myleft > otherright) {
			crash = false;
	}
	return crash;
}
}

//tigers
function enemyTypeOne(width, height, color, x, y, type,status) {
	this.status= status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = Math.random();
	this.speedY = -Math.random();    
	this.x = x;
	this.y = y;    
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "image") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		} 
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;   
	}
}

//dinos
function enemyTypeTwo(width, height, color, x, y, type, status) {
	this.status= status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = Math.random() +1;
	this.speedY = -Math.random() -1;    
	this.x = x;
	this.y = y;    
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "image") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		} 
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;   
	}
}

//ghosts
function enemyTypeThree(width, height, color, x, y, type, status) {
	this.status= status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = Math.random() +3;
	this.speedY = -Math.random() -3;    
	this.x = x;
	this.y = y;    
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "image") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		} 
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;   
	}
}

//cake
function friendliesTypeOne(width, height, color, x, y, type, status) {
	this.status = status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "image") {
			ctx.drawImage(this.image, 
				this.x, 
				this.y,
				this.width, this.height);
		} 
		else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}

function updateGameArea() {
	myGameArea.clear();
	myGameArea.frameNo += 1;
	myBackground.newPos();
	myBackground.update();
	myScore.text="SCORE: " + myGameArea.frameNo;
	myScore.update();

	for (var i = 0; i < tigers.length; i ++) {
		if (myGamePiece.crashWith(tigers[i])) {
			youLost();
			myGameArea.stop();
		} 
	}

	for (var i = 0; i < dinos.length; i ++) {
		if (myGamePiece.crashWith(dinos[i])) {
			youLost();
			myGameArea.stop();
		} 
	}

	for (var i = 0; i < ghosts.length; i ++) {
		if (myGamePiece.crashWith(ghosts[i])) {
			youLost();
			myGameArea.stop();
		} 
	}

	for (var i = 0; i < cakes.length; i ++) {
		if (myGamePiece.crashWith(cakes[i])) {
			if(cakes[i].status === 1) {
				myGameArea.frameNo += 200;
				cakes[i].status = 0;
			}
		} 
	}

	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0; 
	if (myGameArea.keys && myGameArea.keys[37]) myGamePiece.speedX = -6; 
	if (myGameArea.keys && myGameArea.keys[39]) myGamePiece.speedX = 6; 
	if (myGameArea.keys && myGameArea.keys[38]) myGamePiece.speedY = -6; 
	if (myGameArea.keys && myGameArea.keys[40]) myGamePiece.speedY = 6; 
	if (myGamePiece.x <= 0) myGamePiece.speedX = 5;
	if (myGamePiece.x >= 1175) myGamePiece.speedX = -5;
	if (myGamePiece.y <= -5) myGamePiece.speedY = 5;
	if (myGamePiece.y >= 675) myGamePiece.speedY = -5;
	myGamePiece.newPos();
	myGamePiece.update();

	for( var i = 0; i < tigers.length; i++ ) {
		if (tigers[i].x <= 0) {
			tigers[i].speedX = tigers[i].speedX* -1 ;
		}
		if (tigers[i].x >= 1155) {
			tigers[i].speedX =  tigers[i].speedX* -1;
		}
		if (tigers[i].y <= -5) {
			tigers[i].speedY = tigers[i].speedY* -1;
		}
		if (tigers[i].y >= 655) {
			tigers[i].speedY = tigers[i].speedY* -1;
		}
		if(tigers[i].status === 1){
			tigers[i].update();
			tigers[i].newPos();
		}
	}

	for( var i = 0; i < dinos.length; i++ ) {
		if (dinos[i].x <= 0) {
			dinos[i].speedX = dinos[i].speedX* -1 ;
		}
		if (dinos[i].x >= 1145) {
			dinos[i].speedX =  dinos[i].speedX* -1;
		}
		if (dinos[i].y <= -5) {
			dinos[i].speedY = dinos[i].speedY* -1;
		}
		if (dinos[i].y >= 645) {
			dinos[i].speedY = dinos[i].speedY* -1;
		}
		if(dinos[i].status === 1){
			dinos[i].update();
			dinos[i].newPos();
		}
	}

	for( var i = 0; i < ghosts.length; i++ ) {
		if (ghosts[i].x <= 0) {
			ghosts[i].speedX = ghosts[i].speedX* -1 ;
		}
		if (ghosts[i].x >= 1145) {
			ghosts[i].speedX =  ghosts[i].speedX* -1;
		}
		if (ghosts[i].y <= -5) {
			ghosts[i].speedY = ghosts[i].speedY* -1;
		}
		if (ghosts[i].y >= 645) {
			ghosts[i].speedY = ghosts[i].speedY* -1;
		}
		if(ghosts[i].status === 1){
			ghosts[i].update();
			ghosts[i].newPos();
		}
	}

	for (var i = 0; i < cakes.length; i ++) {
		if(cakes[i].status === 1){
			cakes[i].update();
			cakes[i].newPos();
		}
	}

}


function youLost() {
	alert("You lost! Your scorce is: " + myGameArea.frameNo);
}
