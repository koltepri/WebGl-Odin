import {Cube} from "./Cube.js"
import {createGrid,loadCubes} from "./createMap.js"

var canvas;
var gl;

var numVertices = 36;

var points = [];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var matrixLoc;
var colorLoc;

var cubes; 

var n = 2;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
	

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	cubes = createGrid(n);
	let cubeData = loadCubes(cubes);
	points = cubeData[0];
	colors = cubeData[1];

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData(gl.ARRAY_BUFFER, flatten(...points, ...colors), gl.DYNAMIC_DRAW);

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
    
    render();
}




function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = mat4();
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );
	for (var i = 0; i < cubes.length; i+=numVertices)
	{
		mv = mult(mv, cubes[i].transform)	
		gl.uniformMatrix4fv(matrixLoc, false, flatten(mv));
		gl.drawArrays(gl.TRIANGLES, i, numVertices);
	}

    requestAnimFrame( render );
}

