//stage 1:

//phase 1 : 30 secs(t= 0-30)
//phase 2 : 40 secs(t= 30-70)
//phase 3 : 40 secs(t= 70-110) (current)
//phase 4 (BOSS) : 20 secs(t= 110-130)
//phase 5 (Bonus) : 17 secs(t= 130-147)
//3 seconds buffer(t= 147-150)

//stage 2:

//phase 1 : 30 secs(t= 150-180)
//phase 2 : 40 secs(t= 180-220)
//phase 3 : 40 secs(t= 220-260)
//phase 4 (BOSS) : 30 secs(t= 260-290)
//phase 5(Bonus Crazy Mode) : 30 secs(t= 290-320)


function hideStartPage() {
	document.getElementsByClassName("startPage")[0].style.display = "none";
}

function showStartPage() {
	document.getElementsByClassName("startPage")[0].style.display = "block";

}

function showPowerupsPage(){
	document.getElementsByClassName("powerupsPage")[0].style.display = "block";
}

function hidePowerupsPage(){
	document.getElementsByClassName("powerupsPage")[0].style.display = "none";

}

function showEnemiesPage(){
	document.getElementsByClassName("enemiesPage")[0].style.display = "block";
}

function hideEnemiesPage(){
	document.getElementsByClassName("enemiesPage")[0].style.display = "none";

}

function startButton() {
	var startButton = document.getElementsByTagName("button")[0];
	startButton.addEventListener('click', whenStartButtonClicked);
}
startButton();

function whenStartButtonClicked() {
	hideStartPage();
	gameStart();
}

function powerupsButton(){
	var powerupsButton = document.getElementById("powerupsButton");
	powerupsButton.addEventListener('click', whenPowerupsButtonClicked);
}
powerupsButton();

function whenPowerupsButtonClicked(){
	hideStartPage();
	showPowerupsPage();
}

function enemiesButton(){
	var enemiesButton = document.getElementById("enemiesButton");
	enemiesButton.addEventListener('click', whenEnemiesButtonClicked);
}
enemiesButton();

function whenEnemiesButtonClicked(){
	hideStartPage();
	showEnemiesPage();
}

function backButton(){
	var backButtonOne = document.getElementById("backButtonOne");
	backButtonOne.addEventListener('click', whenBackButtonOneClicked);
	var backButtonTwo = document.getElementById("backButtonTwo");
	backButtonTwo.addEventListener('click', whenBackButtonTwoClicked);
}
backButton();

function whenBackButtonOneClicked(){
	showStartPage();
	hidePowerupsPage();
}

function whenBackButtonTwoClicked(){
	showStartPage();
	hideEnemiesPage();
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
var eyeMasks = new Array(0);
var myScore;
var myHealth;
var time = -1;

function gameStart() {
	document.getElementsByClassName("gameStarted")[0].style.display = "block";
	myGamePiece = new component(30, 30, "img/cat_Image.png", 580, 300, "image", 1);
	myBackground = new component(1200, 700, "img/bgImage3.jpg", 0, 0, "image");
	myScore = new component("30px", "Consolas", "red", 10, 40, "text");
	myHealth = new component("30px", "Consolas", "red", 10, 80, "text");

	function timer() {
		time++;
		if(time === 0){
			//spawn P1 enemies
			var tigerIntervalL = setInterval(makeTigersL , 1500);
			setTimeout(function() {
				clearInterval(tigerIntervalL);
			}, 29999);
			var tigerIntervalR = setInterval(makeTigersR , 1500);
			setTimeout(function() {
				clearInterval(tigerIntervalR);
			}, 29999);

			//spawn P1 friendlies
			var cakeInterval = setInterval(makeCakes, 5000);
			setTimeout(function() {
				clearInterval(cakeInterval);
			}, 29999);
			var healthpackInterval = setInterval(makeHealthpacks, 12000);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 29999);
		}

		//when time reaches 30, phase 2 starts
		if(time === 30){
			//removing remaining P1 enemies and powerups
			myGameArea.frameNo += 750;
			console.log(myGameArea.frameNo);
			for(var i = 0; i < tigers.length; i++){
				tigers[i].status = 0;
			}
			for(var i = 0; i < cakes.length; i++){
				cakes[i].status = 0;
			}
			for(var i = 0; i < healthpacks.length; i++){
				healthpacks[i].status = 0;
			}
			
			//spawn P2 enemies
			var tigerIntervalL = setInterval(makeTigersL , 2000);
			setTimeout(function() {
				clearInterval(tigerIntervalL);
			}, 39999);
			var tigerIntervalR = setInterval(makeTigersR , 2000);
			setTimeout(function() {
				clearInterval(tigerIntervalR);
			}, 39999);
			var dinoIntervalL = setInterval(makeDinosL, 3500);
			setTimeout(function() {
				clearInterval(dinoIntervalL);
			}, 39999);
			var dinoIntervalR = setInterval(makeDinosR, 3500);
			setTimeout(function() {
				clearInterval(dinoIntervalR);
			}, 39999);

			//spawn P2 friendlies
			var cakeInterval = setInterval(makeCakes, 5000);
			setTimeout(function() {
				clearInterval(cakeInterval);
			}, 39999);
			var healthpackInterval = setInterval(makeHealthpacks, 15000);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 39999);
			var eyeMaskInterval = setInterval(makeEyeMasks, 20000);
			setTimeout(function() {
				clearInterval(eyeMaskInterval);
			}, 39999);
		}

		//when time reaches 70, phase 3 starts
		if(time === 70){
			//removing remaining P2 enemies and powerups
			myGameArea.frameNo += 1500;
			for(var i = 0; i < tigers.length; i++){
				tigers[i].status = 0;
			}
			for(var i = 0; i < dinos.length; i++){
				dinos[i].status = 0;
			}
			for(var i = 0; i < cakes.length; i++){
				cakes[i].status = 0;
			}
			for(var i = 0; i < healthpacks.length; i++){
				healthpacks[i].status = 0;
			}
			for(var i = 0; i < eyeMasks.length; i++){
				eyeMasks[i].status = 0;
			}

			//making P3 enemies
			var tigerIntervalL = setInterval(makeTigersL , 2500);
			setTimeout(function() {
				clearInterval(tigerIntervalL);
			}, 39999);
			var tigerIntervalR = setInterval(makeTigersR , 2500);
			setTimeout(function() {
				clearInterval(tigerIntervalR);
			}, 39999);
			var dinoIntervalL = setInterval(makeDinosL, 3500);
			setTimeout(function() {
				clearInterval(dinoIntervalL);
			}, 39999);
			var dinoIntervalR = setInterval(makeDinosR, 3500);
			setTimeout(function() {
				clearInterval(dinoIntervalR);
			}, 39999);
			var ghostIntervalL = setInterval(makeGhostsL, 7000);
			setTimeout(function() {
				clearInterval(ghostIntervalL);
			}, 39999);
			var ghostIntervalR = setInterval(makeGhostsR, 7000);
			setTimeout(function() {
				clearInterval(ghostIntervalR);
			}, 39999);

			//spawning P3 friendlies
			var cakeInterval = setInterval(makeCakes, 5000);
			setTimeout(function() {
				clearInterval(cakeInterval);
			}, 39999);
			var healthpackInterval = setInterval(makeHealthpacks, 15000);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 39999);
			var eyeMaskInterval = setInterval(makeEyeMasks, 18000);
			setTimeout(function() {
				clearInterval(eyeMaskInterval);
			}, 39999);
			var potionInterval = setInterval(makePotions, 22000);
			setTimeout(function() {
				clearInterval(potionInterval);
			}, 39999);
		}

		//phase 4(Boss) starts
		if(time === 110){
			//removing remaining P3 enemies and powerups
			myGameArea.frameNo += 2500;
			for(var i = 0; i < tigers.length; i++){
				tigers[i].status = 0;
			}
			for(var i = 0; i < dinos.length; i++){
				dinos[i].status = 0;
			}
			for(var i = 0; i < ghosts.length; i++){
				ghosts[i].status = 0;
			}
			for(var i = 0; i < cakes.length; i++){
				cakes[i].status = 0;
			}
			for(var i = 0; i < healthpacks.length; i++){
				healthpacks[i].status = 0;
			}
			for(var i = 0; i < eyeMasks.length; i++){
				eyeMasks[i].status = 0;
			}
			for(var i = 0; i < potions.length; i++){
				potions[i].status = 0;
			}

			//spawning P4(BOSS)
			var alienIntervalL = setInterval(makeAliensL, 2700);
			setTimeout(function() {
				clearInterval(alienIntervalL);
			}, 19999);
			var alienIntervalR = setInterval(makeAliensR, 1600);
			setTimeout(function() {
				clearInterval(alienIntervalR);
			}, 19999);

			//spawning P4 friendlies
			var cakeInterval = setInterval(makeCakes, 5000);
			setTimeout(function() {
				clearInterval(cakeInterval);
			}, 19999);
			var healthpackInterval = setInterval(makeHealthpacks, 15000);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 19999);
			var bombInterval = setInterval(makeBombs, 10000);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 19999);
		}

		//phase 5(BONUS) starts
		if(time === 130){
			myGameArea.frameNo += 5000;

			//removing remaining P4 enemies and powerups
			for(var i = 0; i < aliens.length; i++){
				aliens[i].status = 0;
			}
			for(var i = 0; i < cakes.length; i++){
				cakes[i].status = 0;
			}
			for(var i = 0; i < healthpacks.length; i++){
				healthpacks[i].status = 0;
			}
			for(var i = 0; i < bombs.length; i++){
				bombs[i].status = 0;
			}

			//spawning friendlies for bonus round
			var cakeInterval = setInterval(makeCakes, 250);
			setTimeout(function() {
				clearInterval(cakeInterval);
			}, 16999);
			var healthpackInterval = setInterval(makeHealthpacks, 4800);
			setTimeout(function() {
				clearInterval(healthpackInterval);
			}, 16999);
		}

		if(time === 150){
			//removing P5 powerups
			for(var i = 0; i < cakes.length; i++){
				cakes[i].status = 0;
			}
			for(var i = 0; i < healthpacks.length; i++){
				healthpacks[i].status = 0;
			}
		}

	}
	setInterval(timer, 1000);

//function for enemies
function makeTigersL(){
	var myTiger = new enemyTypeOne(35, 35, "img/tiger.png", 40, 640*Math.random()+30, "image", 1);
	tigers.push(myTiger);
}

function makeTigersR(){
	var myTiger = new enemyTypeOne(35, 35, "img/tiger.png", 1100, 640*Math.random()+30, "image", 1);
	tigers.push(myTiger);
}

function makeDinosL(){
	var myDino = new enemyTypeTwo(60, 60, "img/dino.png", 65, 590*Math.random()+60, "image", 1);
	dinos.push(myDino);
}

function makeDinosR(){
	var myDino = new enemyTypeTwo(60, 60, "img/dino.png", 1100, 590*Math.random()+60, "image", 1);
	dinos.push(myDino);
}

function makeGhostsL(){
	var myGhost = new enemyTypeThree(50, 50, "img/ghost.png", 55, 600*Math.random()+50, "image", 1);
	ghosts.push(myGhost);
}

function makeGhostsR(){
	var myGhost = new enemyTypeThree(50, 50, "img/ghost.png", 1100, 600*Math.random()+50, "image", 1);
	ghosts.push(myGhost);
}

function makeAliensL(){
	var myAlien = new enemyTypeFour(120, 120, "img/alien.png", 125, Math.random()*590, "image", 1);
	aliens.push(myAlien);
}

function makeAliensR(){
	var myAlien = new enemyTypeFour(120, 120, "img/alien.png", 125, Math.random()*590, "image", 1);
	aliens.push(myAlien);
}

function makePinkAliensL(){
	var myPinkAlienL = new enemyTypeFive(40, 40, "img/pinkAlien.png", 1100, Math.random()*610 +40, "image", 1);
	pinkAliens.push(myPinkAlienL);
}

function makePinkAliensR(){
	var myPinkAlienL = new enemyTypeFive(40, 40, "img/pinkAlien.png", 45, Math.random()*610 +40, "image", 1);
	pinkAliens.push(myPinkAlienL);
}

//Functions for friendlies
function makeCakes(){
	var myCake = new friendliesTypeOne(20, 20, "img/cake.png", Math.random()*1100 , Math.random()*550, "image", 1);
	cakes.push(myCake);
}

function makePotions(){
	var myPotion = new friendliesTypeTwo(25,25, "img/potion.png", Math.random()*1000, Math.random()*500, "image", 1);
	potions.push(myPotion);
}

function makeHealthpacks(){
	var myHealthpack = new friendliesTypeThree(30, 30, "img/healthpack.png", Math.random()*1000, Math.random()*500, "image", 1);
	healthpacks.push(myHealthpack);
}

function makeBombs(){
	var myBomb = new friendliesTypeFour(40, 40, "img/bomb.png", Math.random()*800 +100, Math.random()*350 + 100, "image", 1, 0);
	bombs.push(myBomb);
}

function makeEyeMasks(){
	var myEyeMask = new friendliesTypeFive(30, 30, "img/eyeMask.png", Math.random()*800 +100, Math.random()*350 + 100, "image", 1,);
	eyeMasks.push(myEyeMask);
}

function makeRandomFriendlies(){
	var totalAllies = Math.floor(Math.random() * 4) + 1;
	if(totalAllies === 1){
		makePotions();
	}
	if(totalAllies === 2){
		makeHealthpacks();
	}
	if(totalAllies === 3){
		makeBombs();
	}
	if(totalAllies === 4){
		makeEyeMask();
	}
}
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

function component(width, height, color, x, y, type, status, godMode=0, ghostMode=0) {
	this.status= status;
	this.type = type;
	this.godMode = godMode;
	this.ghostMode = ghostMode;
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
		this.status = status;
		this.type = type;
		if (type == "image") {
			this.image = new Image();
			this.image.src = color;
		}
		this.width = width;
		this.height = height;
		this.speedX = Math.random()+ 0.5;
		this.speedY = -Math.random()+ 0.5;    
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

	//EyeMask
	function friendliesTypeFive(width, height, color, x, y, type, status) {
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
		console.log(time);
		myGameArea.clear();
		myGameArea.frameNo += 1;
		myBackground.newPos();
		myBackground.update();
		myScore.text="SCORE: " + myGameArea.frameNo;
		myScore.update();
		myHealth.text="Health: " + myGameArea.lives;
		myHealth.update();
		var MGP = myGamePiece;

		for (var i = 0; i < tigers.length; i ++) {
			if (MGP.crashWith(tigers[i]) && MGP.godMode === 1) {
				tigers[i].status = 0;
				myGameArea.frameNo += 25;
			}
			if (MGP.crashWith(tigers[i]) && tigers[i].status === 1 && MGP.godMode === 0 && MGP.ghostMode === 0) {
				myGameArea.lives--;
				tigers[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 3000);
				if(myGameArea.lives <= 0){
					youLost();
					myGameArea.stop();
				}
			}
		}

		for (var i = 0; i < dinos.length; i ++) {
			if (MGP.crashWith(dinos[i])  && MGP.godMode === 1) {
				dinos[i].status = 0;
				myGameArea.frameNo += 50;
			}
			if (MGP.crashWith(dinos[i]) && dinos[i].status === 1 && MGP.godMode === 0 && MGP.ghostMode === 0) {
				myGameArea.lives--;
				dinos[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 3000);
				if(myGameArea.lives <= 0){
					youLost();
					myGameArea.stop()
				}
			}
		}

		for (var i = 0; i < ghosts.length; i ++) {
			if (MGP.crashWith(ghosts[i]) && MGP.godMode === 1) {
				ghosts[i].status = 0;
				myGameArea.frameNo += 75;
			}
			if (MGP.crashWith(ghosts[i]) && ghosts[i].status === 1 && MGP.godMode === 0 && MGP.ghostMode === 0) {
				myGameArea.lives--;
				ghosts[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 3000);
				if(myGameArea.lives <= 0){
					youLost();
					myGameArea.stop()
				}
			}
		}

		for (var i = 0; i < aliens.length; i ++) {
			if (MGP.crashWith(aliens[i]) && MGP.godMode === 1) {
				aliens[i].status = 0;
				myGameArea.frameNo += 250;
			}
			if (MGP.crashWith(aliens[i]) && aliens[i].status === 1 && MGP.godMode === 0 && MGP.ghostMode === 0) {
				myGameArea.lives -= 2;
				aliens[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 3000);
				if(myGameArea.lives <= 0){
					youLost();
					myGameArea.stop()
				}
			}
		}

		for (var i = 0; i < pinkAliens.length; i ++) {
			if (MGP.crashWith(pinkAliens[i]) && MGP.godMode === 1) {
				pinkAliens[i].status = 0;
				myGameArea.frameNo += 100;
			}
			if (MGP.crashWith(pinkAliens[i]) && pinkAliens[i].status === 1 && MGP.godMode === 0 && MGP.ghostMode === 0) {
				myGameArea.lives --;
				pinkAliens[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 3000);
				if(myGameArea.lives <= 0){
					youLost();
					myGameArea.stop()
				}
			}
		}

		for (var i = 0; i < cakes.length; i ++) {
			if (MGP.crashWith(cakes[i])) {
				if(cakes[i].status === 1) {
					myGameArea.frameNo += 200;
					cakes[i].status = 0;
				}
			} 
		}

		for (var i = 0; i < potions.length; i ++) {
			if (MGP.crashWith(potions[i]) && MGP.ghostMode === 0 && MGP.godMode === 0) {
				function godTime(){
					MGP.godMode = 0;
				}
				setTimeout(godTime, 5000);
				if(potions[i].status === 1) {
					potions[i].status = 0;
				}
				MGP.godMode = 1;
			} 
		}

		for (var i = 0; i < eyeMasks.length; i ++) {
			if (MGP.crashWith(eyeMasks[i]) && eyeMasks[i].status === 1 && MGP.ghostMode === 0) {
				eyeMasks[i].status = 0;
				MGP.ghostMode = 1;
				function invisTime(){
					MGP.ghostMode = 0;
				}	
				var eyeMaskTimeout = setTimeout(invisTime, 7000);
			}
		}

		if (MGP.ghostMode === 1){
			MGP.image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/catGhost.png";
		}


		for (var i = 0; i < bombs.length; i ++) {
			if (MGP.crashWith(bombs[i]) && bombs[i].status === 1 && MGP.ghostMode === 0) {
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

		for (var i = 0; i < healthpacks.length; i ++) {
			if (MGP.crashWith(healthpacks[i]) && MGP.ghostMode === 0) {
				if(healthpacks[i].status === 1) {
					healthpacks[i].status = 0;
					myGameArea.lives++;
				}
			} 
		}

		MGP.speedX = 0;
		MGP.speedY = 0; 
		if (myGameArea.keys && myGameArea.keys[37]) MGP.speedX = -6; 
		if (myGameArea.keys && myGameArea.keys[39]) MGP.speedX = 6; 
		if (myGameArea.keys && myGameArea.keys[38]) MGP.speedY = -6; 
		if (myGameArea.keys && myGameArea.keys[40]) MGP.speedY = 6; 
		if (MGP.x <= 0) MGP.speedX = 5;
		if (MGP.x >= 1175) MGP.speedX = -5;
		if (MGP.y <= -5) MGP.speedY = 5;
		if (MGP.y >= 675) MGP.speedY = -5;
		if(MGP.godMode === 1){
			MGP.image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/fire.png";
		}
		if(MGP.godMode === 0 && MGP.ghostMode === 0){
			MGP.image.src = "file://localhost/Users/chuazhengwin/GA--Project-One/img/cat_Image.png";
		}
		MGP.newPos();
		MGP.update();

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
			if(pinkAliens[i].x > MGP.x) {
				pinkAliens[i].x -= 0.8;
			}
			if(pinkAliens[i].x < MGP.x) {
				pinkAliens[i].x += 0.8;
			}
			if(pinkAliens[i].y > MGP.y) {
				pinkAliens[i].y -= 0.8;
			}
			if(pinkAliens[i].y < MGP.y) {
				pinkAliens[i].y += 0.8;
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
				if(bombs[i].crashWith(tigers[a]) && bombs[i].explosionMode === 1 && tigers[a].status === 1){
					tigers[a].status = 0;
					myGameArea.frameNo += 25;
				}
			}

			for(var b = 0; b < dinos.length; b++){
				if(bombs[i].crashWith(dinos[b]) && bombs[i].explosionMode === 1 && dinos[b].status === 1){
					dinos[b].status = 0;
					myGameArea.frameNo += 50;
				}
			}

			for(var c = 0; c < ghosts.length; c++){
				if(bombs[i].crashWith(ghosts[c]) && bombs[i].explosionMode === 1 && ghosts[c].status === 1){
					ghosts[c].status = 0;
					myGameArea.frameNo += 75;
				}
			}

			for(var d = 0; d < aliens.length; d++){
				if(bombs[i].crashWith(aliens[d]) && bombs[i].explosionMode === 1 && aliens[d].status === 1){
					aliens[d].status = 0;
					myGameArea.frameNo += 250;
				}
			}

			for(var e = 0; e <pinkAliens.length; e++){
				if(bombs[i].crashWith(pinkAliens[e]) && bombs[i].explosionMode === 1 && pinkAliens[e].status === 1){
					pinkAliens[e].status = 0;
					myGameArea.frameNo += 100;
				}
			}
		}

		for (var i = 0; i < eyeMasks.length; i ++) {
			if(eyeMasks[i].status === 1){
				eyeMasks[i].update();
				eyeMasks[i].newPos();
			}
		}
	}

	function youLost() {
		alert("Game Over! Your score is: " + myGameArea.frameNo + ". You survived for "+ time + " seconds!" );
	}