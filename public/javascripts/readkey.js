
let canvas = document.createElement('canvas');
// Canvas element created.

let ctx = canvas.getContext('2d');
//Creates context on the canvas.width

let newDiv = document.getElementById("test");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight*0.5;
canvas.border = '1px solid black';
newDiv.appendChild(canvas);
let x = canvas.width/2;
let y = canvas.height -30;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
drawPaddle();var lives = 3;
var score = 0;
var dx = 2;

var dy = -2;
var ballRadius = 10;



var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c=0; c<brickColumnCount; c++)
			{
				bricks[c] = [];
				for(var r=0; r<brickRowCount;r++)
					{
					bricks[c][r] = {x:0, y:0, status:1 };
					}
			}

function drawBall()
{
ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle="#0095DD";
ctx.fill();
ctx.closePath();
}


function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#ff0000";
	ctx.fill();
	ctx.closePath();
}


	
// function drawLives()
// {
// 	ctx.font = "16px Arial";
// 	ctx.fillStyle = "#0095DD";
// 	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
// }



// function drawBricks() 

// {
// 	for(var c=0; c<brickColumnCount; c++)
// 		{
// 			for(var r=0; r<brickRowCount; r++) 
// 				{
// 					if(bricks[c][r].status ==1)
// 						{
// 							var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
// 							var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
// 							bricks[c][r].x = brickX;
// 							bricks[c][r].y = brickY;
// 							ctx.beginPath();
// 							ctx.rect(brickX,brickY,brickWidth, brickHeight);
// 							ctx.fillStyle = "#0095DD";
// 							ctx.fill();
// 							ctx.closePath();
// 					}
// 				}
// 			}
// }


function drawScore()
{
	ctx.font = "16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score: " +score, 8, 20);
}


function draw()

{
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBall.fillStyle="green";
	// drawBricks();
	// drawBall();
	drawPaddle();
	// drawScore();
	// drawLives();
	// collisionDetect();

	if(rightPressed && paddleX < canvas.width-paddleWidth)
		{
			paddleX+=7;
		}
	else if(leftPressed && paddleX > 0)
		{
			paddleX-=7;
		}
		x+=dx;
		y+=dy;
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
				
				{
				dx = -dx;
				}

	if(y + dy < ballRadius) 
		
		{
			dy = -dy;
		}

	else if(y + dy > canvas.height -ballRadius)
	
		{
				if(x > paddleX && x < paddleX + paddleWidth) 
					{
						dy= -dy;
					}
				else
					{				
							lives--;
							 if(!lives){
														alert("Game OVER!");
														document.location.reload();
												}
							else
											{
														x = canvas.width/2;
														y = canvas.height-30;
														dx = 2;
														dy = -2;
														paddleX = (canvas.width-paddleWidth)/2;
												}
	
						}
			}

requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e)
	{
		var relativeX = e.clientX - canvas.offsetLeft;
		if(relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
			}

	}


function keyDownHandler(e){
	if(e.keyCode ==39){

		rightPressed = true;
	}
	

	else if(e.keyCode ==37) {

		leftPressed = true;

	}

}


function keyUpHandler(e){

		if(e.keyCode ==39)

		{
		rightPressed = false;
		}
				else if (e.keyCode ==37)
						{
						leftPressed = false;
						}
}
	function collisionDetect(){
	for(var c=0; c<brickColumnCount; c++){
		for(var r=0; r<brickRowCount; r++){
			var b= bricks[c][r];
			if(b.status ==1){
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y +brickHeight){
				dy = -dy;
				b.status = 0;
				score++;
				if(score ==brickRowCount*brickColumnCount){
					alert("you WIN!");
					document.location.reload();
				}
			}
		}
	}

}

	}		
draw();