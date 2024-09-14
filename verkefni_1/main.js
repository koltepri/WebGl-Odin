import {createRect} from "./helpers.js"
import {Bird} from "./Bird.js"
import {Player,Bullet} from "./Player.js"

"use strict";

var gl;
var locColor;
var positionLoc;
var bufferId;

var player = new Player();

var maxBullets = 100; // i need to define this for memory allocation
var bullets = [];

var numberOfBirds = 3;
var birds = [];

var mapPositions = [];
var birdPositions = [];
var bulletPositions = new Float32Array(maxBullets*12); // each rectangle is 12 points
var playerPositions = [];
var allPositions = [];

var speed = 30;

var mouseX;
var movement = false;


window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

	createMap();
	createBirds(numberOfBirds);
	updateBirds();
	allPositions = [mapPositions, playerPositions, birdPositions].flat(1);
	let bufferArray = new Float32Array([...flatten(allPositions), ...bulletPositions]);

	bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, bufferArray, gl.DYNAMIC_DRAW);

	locColor = gl.getUniformLocation(program,"rcolor");

    // Associate out shader variables with our data buffer
    positionLoc = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

	// Event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        mouseX = e.offsetX;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            var xmove = 2*(e.offsetX - mouseX)/canvas.width;
            mouseX = e.offsetX;
			player.movePlayerX(xmove);
			playerPositions = player.position;

            gl.bufferSubData(gl.ARRAY_BUFFER, 24*4, flatten(playerPositions));
        }
    } );

	// -- Event listener for keyboard
    window.addEventListener("keydown", function(e){
        if ( e.code == "Space" ) {
			if (bullets.length < maxBullets)
			{
				let bullet = new Bullet(player)
				bullets.push(bullet);
			}
			else console.log("you've run out of bullets");
		}
	});

    render();
};

function createMap()
{
	mapPositions.push(createRect(-1.0,1.0,1.0,0.8)); //birdArea
	mapPositions.push(createRect(-1.0,-0.6,1.0,0.2)); //playerArea
	mapPositions = mapPositions.flat(2);

	// also create the player
	playerPositions = player.position;
}

function createBirds(birdsToCreate)
{
	for(let i = 0; i < birdsToCreate; i++)
	{
		let xVelocity = Math.random() * (0.03 - (-0.03)) + (-0.03);
		let bird = new Bird(xVelocity);
		birds.push(bird);
	}
}

function updateBirds()
{
	birdPositions = []; 
	for(let bird of birds)
	{
		bird.updateBirdPosition();
		if (bird.isOutOfBounds()) 
		{
			birds.splice(birds.indexOf(bird), 1);
			createBirds(1);
			birdPositions.push(bird.birdBox);
		}
		else birdPositions.push(bird.birdBox);
	}

	birdPositions = birdPositions.flat(2);
	
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
	gl.bufferSubData(gl.ARRAY_BUFFER, 30*4, flatten(birdPositions));

}

function updateBullets()
{
	bulletPositions = [];
	for(let bullet of bullets)
	{
		bullet.updatePosition();
		

		bulletPositions.push(bullet.position);
	}

	bulletPositions = bulletPositions.flat(2);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferSubData(gl.ARRAY_BUFFER, birds.length*6*4*2+30*4, flatten(bulletPositions));
}



function render() {
	updateBirds();
	updateBullets();

    gl.clear( gl.COLOR_BUFFER_BIT );

	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,1.0,1.0)));
    gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.uniform4fv(locColor,flatten(vec4(0.588, 0.349, 0.031, 0.49)));
	gl.drawArrays(gl.TRIANGLES, 6, 6);

	gl.uniform4fv(locColor,flatten(vec4(1.0,0.0,0.0,1.0)));
	gl.drawArrays(gl.TRIANGLES, 12, 3);

	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,0.0,1.0)));
	gl.drawArrays(gl.TRIANGLES, 15, birds.length*6);

	gl.uniform4fv(locColor,flatten(vec4(0.5,0.5,0.5,1.0)));
	gl.drawArrays(gl.TRIANGLES, 15+birds.length*6, bullets.length*6);


	setTimeout(
        function () {requestAnimFrame( render );},
        speed
    );
}
