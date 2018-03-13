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
var aliens = new Array(0);
var pinkAliens = new Array(0);
var cakes = new Array(0);
var potions = new Array(0);
var healthpacks = new Array(0);
var bombs = new Array(0);
var myScore;
var myLives;


function gameStart() {
	document.getElementsByClassName("gameStarted")[0].style.display = "block";
	myGamePiece = new component(30, 30, "img/cat_Image.png", 580, 300, "image", 1);
	myBackground = new component(1200, 700, "img/bgImage3.jpg", 0, 0, "image");
	myScore = new component("30px", "Consolas", "red", 1000, 40, "text");
	myLives = new component("30px", "Consolas", "red", 1000, 80, "text");
	var time = 0;

	function timer(){
		time++
		if(time > 450){
			clearInterval(tigerInterval);
		}
		if(time > 500){
			clearInterval(dinoInterval);
		}
	}
	setInterval(timer, 1000);

	function makeTigersL(){
		var myTiger = new enemyTypeOne(50, 50, "img/tiger.png", 30, 650*Math.random(), "image", 1);
		tigers.push(myTiger);
	}
	var tigerInterval = setInterval(function(){ makeTigersL()} , 6000);

	function makeTigersR(){
		var myTiger = new enemyTypeOne(50, 50, "img/tiger.png", 1100, 650*Math.random(), "image", 1);
		tigers.push(myTiger);
	}
	var tigerInterval = setInterval(function(){ makeTigersR()} , 6000);


	function makeDinos(){
		var myDino = new enemyTypeTwo(70, 70, "img/dino.png", 1050, 650*Math.random(), "image", 1);
		dinos.push(myDino);
	}
	var dinoInterval = setInterval(makeDinos, 10000);

	function makeGhosts(){
		for(var i = 0; i<3 ; i++){
			var myGhost = new enemyTypeThree(60, 60, "img/ghost.png", 30, 650*Math.random(), "image", 1);
			ghosts.push(myGhost);
		}
	}
	var ghostInterval = setInterval(makeGhosts, 20000);

	function makeAliens(){
		var myAlien = new enemyTypeFour(120, 120, "img/alien.png", 50, Math.random()*590, "image", 1);
		aliens.push(myAlien);
	}
	var alienInterval = setInterval(makeAliens, 60000);

	function makePinkAliens(){
		var myPinkAlien = new enemyTypeFive(40, 40, "img/pinkAlien.png", 1100, Math.random()*650, "image", 1);
		pinkAliens.push(myPinkAlien);
	}
	var pinkAlienInterval = setInterval(makePinkAliens, 25000);

	function makeCakes(){
		var myCake = new friendliesTypeOne(20, 20, "img/cake.png", Math.random()*1100 , Math.random()*550, "image", 1);
		cakes.push(myCake);
	}
	var cakeInterval = setInterval(makeCakes, 5000);

	function makePotions(){
		var myPotion = new friendliesTypeTwo(25,25, "img/potion.png", Math.random()*1100, Math.random()*550, "image", 1);
		potions.push(myPotion);
	}
	var potionInterval = setInterval(makePotions, 50000);

	function makeHealthpacks(){
		var myHealthpack = new friendliesTypeThree(30, 30, "img/healthpack.jpg", Math.random()*1100, Math.random()*550, "image", 1);
		healthpacks.push(myHealthpack);
	}
	var healthpackInterval = setInterval(makeHealthpacks, 17000);

	function makeBombs(){
		var myBomb = new friendliesTypeFour(40, 40, "img/bomb.png", Math.random()*1100, Math.random()*550, "image", 1, 0);
		bombs.push(myBomb);
	}
	var bombInterval = setInterval(makeBombs, 50000);



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
		this.lives = 3;
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

function component(width, height, color, x, y, type, status, godMode=0) {
	this.status= status;
	this.type = type;
	this.godMode = godMode;
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
		if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
			crash = false;
		}
		return crash;
	}
}

//tigers
function enemyTypeOne(width, height, color, x, y, type, status) {
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

//aliens
function enemyTypeFour(width, height, color, x, y, type, status) {
	this.status= status;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.speedX = Math.random() +4;
	this.speedY = -Math.random() -4;    
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

//pinkAliens
function enemyTypeFive(width, height, color, x, y, type, status) {
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

//cakes
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

//potions
function friendliesTypeTwo(width, height, color, x, y, type, status) {
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

//healthpacks
function friendliesTypeThree(width, height, color, x, y, type, status) {
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

//bombs
function friendliesTypeFour(width, height, color, x, y, type, status, explosionMode) {
	this.explosionMode = explosionMode;
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
		if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
			crash = false;
		}
		return crash;
	}
}

function updateGameArea() {
	myGameArea.clear();
	myGameArea.frameNo += 1;
	myBackground.newPos();
	myBackground.update();
	myScore.text="SCORE: " + myGameArea.frameNo;
	myScore.update();
	myLives.text="LIVES: " + myGameArea.lives;
	myLives.update();

	for (var i = 0; i < tigers.length; i ++) {
		if (myGamePiece.crashWith(tigers[i]) && myGamePiece.godMode === 1) {
			tigers[i].status = 0;
			myGameArea.frameNo += 50;
		}
		if (myGamePiece.crashWith(tigers[i]) && tigers[i].status === 1 && myGamePiece.godMode === 0) {
			myGameArea.lives--;
			tigers[i].status = 0;
			if(myGameArea.lives <= 0){
				youLost();
				myGameArea.stop()
			}
		}

	}

	for (var i = 0; i < dinos.length; i ++) {
		if (myGamePiece.crashWith(dinos[i])  && myGamePiece.godMode === 1) {
			dinos[i].status = 0;
			myGameArea.frameNo += 100;
		}
		if (myGamePiece.crashWith(dinos[i]) && dinos[i].status === 1 && myGamePiece.godMode === 0) {
			myGameArea.lives--;
			dinos[i].status = 0;
			if(myGameArea.lives <= 0){
				youLost();
				myGameArea.stop()
			}
		}
	}

	for (var i = 0; i < ghosts.length; i ++) {
		if (myGamePiece.crashWith(ghosts[i]) && myGamePiece.godMode === 1) {
			ghosts[i].status = 0;
			myGameArea.frameNo += 150;
		}
		if (myGamePiece.crashWith(ghosts[i]) && ghosts[i].status === 1 && myGamePiece.godMode === 0) {
			myGameArea.lives--;
			ghosts[i].status = 0;
			if(myGameArea.lives <= 0){
				youLost();
				myGameArea.stop()
			}
		}
	}

	for (var i = 0; i < aliens.length; i ++) {
		if (myGamePiece.crashWith(aliens[i]) && myGamePiece.godMode === 1) {
			aliens[i].status = 0;
			myGameArea.frameNo += 500;
		}
		if (myGamePiece.crashWith(aliens[i]) && aliens[i].status === 1 && myGamePiece.godMode === 0) {
			myGameArea.lives -= 3;
			aliens[i].status = 0;
			if(myGameArea.lives <= 0){
				youLost();
				myGameArea.stop()
			}
		}
	}

	for (var i = 0; i < pinkAliens.length; i ++) {
		if (myGamePiece.crashWith(pinkAliens[i]) && myGamePiece.godMode === 1) {
			pinkAliens[i].status = 0;
			myGameArea.frameNo += 200;
		}
		if (myGamePiece.crashWith(pinkAliens[i]) && pinkAliens[i].status === 1 && myGamePiece.godMode === 0) {
			myGameArea.lives --;
			pinkAliens[i].status = 0;
			if(myGameArea.lives <= 0){
				youLost();
				myGameArea.stop()
			}
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

	for (var i = 0; i < potions.length; i ++) {
		if (myGamePiece.crashWith(potions[i])) {
			if(potions[i].status === 1) {
				potions[i].status = 0;
			}
			myGamePiece.godMode = 1;
		} 
	}

	for (var i = 0; i < healthpacks.length; i ++) {
		if (myGamePiece.crashWith(healthpacks[i])) {
			if(healthpacks[i].status === 1) {
				healthpacks[i].status = 0;
				myGameArea.lives++;
			}
		} 
	}

	for (var i = 0; i < bombs.length; i ++) {
		if (myGamePiece.crashWith(bombs[i]) && bombs[i].status === 1) {
			bombs[i].explosionMode = 1;
			bombs[i].x -= 180;
			bombs[i].y -= 180;
			bombs[i].status = 0;
		}

		if (bombs[i].explosionMode === 1){
			bombs[i].image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/explosion.png";
			bombs[i].width = 400;
			bombs[i].height = 400;

			function bombTime(){
				for (var i = 0; i < bombs.length; i++) {
					bombs[i].explosionMode = 0;
				}
			}
			setTimeout(bombTime, 3000);
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
	if(myGamePiece.godMode === 1){
		myGamePiece.image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/fire.png";
	}

	if(myGamePiece.godMode === 0){
		myGamePiece.image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/cat_image.png";
	}
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

	for( var i = 0; i < aliens.length; i++ ) {
		if (aliens[i].x <= 0) {
			aliens[i].speedX = aliens[i].speedX* -1 ;
		}
		if (aliens[i].x >= 1090) {
			aliens[i].speedX =  aliens[i].speedX* -1;
		}
		if (aliens[i].y <= -5) {
			aliens[i].speedY = aliens[i].speedY* -1;
		}
		if (aliens[i].y >= 590) {
			aliens[i].speedY = aliens[i].speedY* -1;
		}
		if(aliens[i].status === 1){
			aliens[i].update();
			aliens[i].newPos();
		}
	}

	for( var i = 0; i < pinkAliens.length; i++ ) {
		if(pinkAliens[i].x > myGamePiece.x) {
			pinkAliens[i].x -= 0.5;
		}
		if(pinkAliens[i].x < myGamePiece.x) {
			pinkAliens[i].x += 0.5;
		}
		if(pinkAliens[i].y > myGamePiece.y) {
			pinkAliens[i].y -= 0.5;
		}
		if(pinkAliens[i].y < myGamePiece.y) {
			pinkAliens[i].y += 0.5;
		}
		if(pinkAliens[i].status === 1){
			 pinkAliens[i].update();
			 pinkAliens[i].newPos();
		}
	}

	for (var i = 0; i < cakes.length; i ++) {
		if(cakes[i].status === 1){
			cakes[i].update();
			cakes[i].newPos();
		}
	}

	for (var i = 0; i < potions.length; i ++) {
		if(potions[i].status === 1){
			potions[i].update();
			potions[i].newPos();
		}
	}

	if(myGamePiece.godMode === 1){
		function godTime(){
			myGamePiece.godMode = 0;
		}
		setTimeout(godTime, 5000);
	}

	for (var i = 0; i < healthpacks.length; i ++) {
		if(healthpacks[i].status === 1){
			healthpacks[i].update();
			healthpacks[i].newPos();
		}
	}

	for (var i = 0; i < bombs.length; i ++) {
		if(bombs[i].status === 1 || bombs[i].explosionMode === 1){
			bombs[i].update();
			bombs[i].newPos();
		}
		for(var a = 0; a < tigers.length; a++){
			if(bombs[i].crashWith(tigers[a]) && bombs[i].explosionMode === 1){
				tigers[a].status = 0;
				myGameArea.frameNo += 50;
			}
		}
		for(var b = 0; b < dinos.length; b++){
			if(bombs[i].crashWith(dinos[b]) && bombs[i].explosionMode === 1){
				dinos[b].status = 0;
				myGameArea.frameNo += 100;
			}
		}

		for(var c = 0; c < ghosts.length; c++){
			if(bombs[i].crashWith(ghosts[c]) && bombs[i].explosionMode === 1){
				ghosts[c].status = 0;
				myGameArea.frameNo += 150;
			}
		}

		for(var d = 0; d < aliens.length; d++){
			if(bombs[i].crashWith(aliens[d]) && bombs[i].explosionMode === 1){
				aliens[d].status = 0;
				myGameArea.frameNo += 500;
			}
		}

		for(var e = 0; e <pinkAliens.length; e++){
			if(bombs[i].crashWith(pinkAliens[e]) && bombs[i].explosionMode === 1){
				pinkAliens[e].status = 0;
				myGameArea.frameNo += 200;
			}
		}
	}
}


function youLost() {
	alert("You lost! Your scorce is: " + myGameArea.frameNo);
}
