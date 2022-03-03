
let canvas = document.createElement('canvas');
// Canvas element created.

let ctx = canvas.getContext('2d');
//Creates context on the canvas.width

let newDiv = document.getElementById("test");
// Div to hold the canvas element.

canvas.width = window.innerHeight;
// Width of canvas

canvas.height = window.innerHeight*0.5;
// Height of canvas

canvas.border = '1px solid black';
// Canvas border.
newDiv.appendChild(canvas);
//adding canvas to div.


let stageWidth = canvas.width/2;
// middle of canvas.
let stageHeight = canvas.height -30;
// stage height.

let paddleHeight = 10;
//height of the paddle.

let paddleWidth = 75;
// width of the paddle.

let paddleX = (canvas.width-paddleWidth)/2;
// starting position of paddle.

drawPaddle();

var lives = 3;
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
	ctx.arc(stageWidth, stageHeight, ballRadius, 0, Math.PI*2);
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
	stageWidth+=dx;
	stageHeight+=dy;
	if(stageWidth + dx > canvas.width-ballRadius || stageWidth + dx < ballRadius) 
		{
			dx = -dx;
		}
	if(stageHeight + dy < ballRadius) 
		{
			dy = -dy;
		}
	else if(stageHeight + dy > canvas.height -ballRadius)
		{
			if(stageWidth > paddleX && stageWidth < paddleX + paddleWidth) 
				{
					dy= -dy;
				}
			else
				{				
					lives--;
						if(!lives)
							{
								alert("Game OVER!");
								document.location.reload();
							}
						else
							{
								stageWidth = canvas.width/2;
								stageHeight = canvas.height-30;
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
	if(relativeX > 0 && relativeX < canvas.width) 
		{
			paddleX = relativeX - paddleWidth/2;
		}
	}

function keyDownHandler(e)
	{
		if(e.keyCode ==39)
			{
				rightPressed = true;
			}
		else if(e.keyCode ==37) 
			{
				leftPressed = true;
			}
	}

function keyUpHandler(e)
	{
		if(e.keyCode ==39)
			{
				rightPressed = false;
			}
		else if (e.keyCode ==37)
			{
				leftPressed = false;
			}
	}

function collisionDetect()
	{
		for(var c=0; c<brickColumnCount; c++)
			{
				for(var r=0; r<brickRowCount; r++)
					{
						var b= bricks[c][r];
						if(b.status ==1)
							{
								if(stageWidth > b.x && stageWidth < b.x+brickWidth && stageHeight > b.y && stageHeight < b.y +brickHeight)
									{
										dy = -dy;
										b.status = 0;
										score++;
										if(score ==brickRowCount*brickColumnCount)
											{
												alert("you WIN!");
												document.location.reload();
											}
									}
							}
					}

			}

	}		
draw();