import {createRect} from "./helpers.js"
import {Bird} from "./Bird.js"

"use strict";

var gl;
var locColor;
var positionLoc;
var bufferId;

var numberOfBirds = 3;
var birds = [];

var mapPositions = [];
var birdPositions = [];
var allPositions = [];

var speed = 30;


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
	allPositions = [mapPositions, birdPositions].flat(1);

	bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(allPositions), gl.DYNAMIC_DRAW);

	locColor = gl.getUniformLocation(program,"rcolor");

    // Associate out shader variables with our data buffer
    positionLoc = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    render();
};

function createMap()
{
	mapPositions.push(createRect(-1.0,1.0,1.0,0.8)); //birdArea
	mapPositions.push(createRect(-1.0,-0.6,1.0,0.2)); //playerArea
	mapPositions = mapPositions.flat(2);
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
			console.log("outOfBounds");
			birds.splice(birds.indexOf(bird), 1);
			createBirds(1);
			birdPositions.push(bird.getBirdBox());
		}
		else birdPositions.push(bird.getBirdBox());
	}

	birdPositions = birdPositions.flat(2);
	
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
	gl.bufferSubData(gl.ARRAY_BUFFER, 24*4, flatten(birdPositions));

}

function updateAllPositions()
{

}

function render() {
	updateBirds();

    gl.clear( gl.COLOR_BUFFER_BIT );

	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,1.0,1.0)));
    gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.uniform4fv(locColor,flatten(vec4(0.588, 0.349, 0.031, 0.49)));
	gl.drawArrays(gl.TRIANGLES, 6, 6);


	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,0.0,1.0)));
	gl.drawArrays(gl.TRIANGLES, 12, birds.length*6)

	setTimeout(
        function () {requestAnimFrame( render );},
        speed
    );
}
