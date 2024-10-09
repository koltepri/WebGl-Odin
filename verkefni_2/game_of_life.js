import {createGrid, getCubePoints } from "./createMap.js"

var canvas;
var gl;

var numVertices = 36;

var points = [];

var movement = false;     // Do we rotate?
var spinX = 45;
var spinY = 45;
var origX;
var origY;
var zoom = 0.5;
const zoomSpeed = 0.1;

var matrixLoc;
var colorLoc;

var cubes; 

var n = 3;
var cubeSize = 1/n; // the side length of each cube, 2 fills up the entire canvas

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.7, 0.7, 0.7, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
	

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	cubes = createGrid(n);
	points = getCubePoints(cubeSize);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.DYNAMIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    matrixLoc = gl.getUniformLocation( program, "transform" );
    colorLoc = gl.getUniformLocation( program, "vColor" );

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (origX - e.offsetX) ) % 360;
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );

   canvas.addEventListener("wheel", function(e){
    // Zoom in when scrolling up, zoom out when scrolling down
    if (e.deltaY < 0) {
        zoom += zoomSpeed;
    } else {
        zoom -= zoomSpeed;
    }

    // Limit zoom levels 
    zoom = Math.max(0.1, Math.min(zoom, 10)); 

    e.preventDefault(); // Prevent default scroll behavior
	});

    render();
}




function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );
	mv = mult(mv, scalem(zoom,zoom,zoom));
	for (var i = 0; i < cubes.length; i++)
	{
		let m = mult(mv, cubes[i].transform)	
		gl.uniform4fv(colorLoc, flatten(cubes[i].color))
		gl.uniformMatrix4fv(matrixLoc, false, flatten(m));
		gl.drawArrays(gl.TRIANGLES, 0, numVertices);
	}

    requestAnimFrame( render );
}

