import {createRect} from "./helpers.js"
import {Bird} from "./Bird.js"

"use strict";

var gl;
var locColor;
var positionLoc;

var numberOfBirds = 3;
var birds = [];

var mapPositions = [];
var birdPositions = [];
var allPositions = [];


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

	locColor = gl.getUniformLocation(program,"rcolor");

    // Associate out shader variables with our data buffer
    positionLoc = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(positionLoc);

	createMap();
	createBirds();

    render();
};

function createMap()
{
	mapPositions.push(createRect(-1.0,1.0,1.0,0.8)); //birdArea
	mapPositions.push(createRect(-1.0,-0.6,1.0,0.2)); //playerArea
	mapPositions = mapPositions.flat(2);
}

function createBirds()
{
	for(let i = 0; i < numberOfBirds; i++)
	{
		let xVelocity = Math.random() - 0.5;
		let bird = new Bird(xVelocity);
		birds.push(bird);
		birdPositions.push(bird.getBirdBox());
	}
	birdPositions = birdPositions.flat(2);
}

function updateBirds()
{
	birdPositions = []; // reinitializing instead of updating feels wrong
	for(let bird of birds)
	{
		bird.updateBirdPosition();
		birdPositions.push(bird.getBirdBox());
	}
	birdPositions = birdPositions.flat(2);
}

function updateAllPositions()
{
	updateBirds()

	allPositions = [mapPositions, birdPositions].flat(1);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(allPositions), gl.STATIC_DRAW);

    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

}

function render() {
	updateAllPositions();

    gl.clear( gl.COLOR_BUFFER_BIT );

	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,1.0,1.0)));
    gl.drawArrays(gl.TRIANGLES, 0, 6);

	gl.uniform4fv(locColor,flatten(vec4(0.588, 0.349, 0.031, 0.49)));
	gl.drawArrays(gl.TRIANGLES, 6, 6);

	gl.uniform4fv(locColor,flatten(vec4(0.0,1.0,0.0,1.0)));
	gl.drawArrays(gl.TRIANGLES, 12, numberOfBirds*6)

	window.requestAnimFrame(render);
}
