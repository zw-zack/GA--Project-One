
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




var myGamePiece;
var myBackground;

function gameStart() {
    myGamePiece = new component(30, 30, "cat_image.png", 580, 300, "image");
    myBackground = new component(1200, 700, "bg_image.jpg", 0, 0, "image");

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
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
        } else {
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
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
















}