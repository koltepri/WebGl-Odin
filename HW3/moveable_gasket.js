"use strict";

var gl;
var points;

var NumPoints = 5000;

var rand = Math.random; // maybe not syntactically allowed

var locColor; 
var color = flatten(vec4(1.0,0.0,0.0,1.0))

var locScaling;
var scaling = 1.0;

var mouseX;
var mouseY;
var totalX = 0;
var totalY = 0;
var movement = false;

var tMatrixLoc;
var tMatrix = translate(0,0,0); // identity matrix



window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];

    var u = add( vertices[0], vertices[1] );
    var v = add( vertices[0], vertices[2] );
    var p = scale( 0.25, add( u, v ) );

    points = [ p ];

    for ( var i = 0; points.length < NumPoints; ++i ) {
        var j = Math.floor(Math.random() * 3);
        p = add( points[i], vertices[j] );
        p = scale( 0.5, p );
        points.push( p );
    }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	// ---
	locColor = gl.getUniformLocation(program,"rcolor");

	window.addEventListener("keydown", function(e){
        if ( e.code == "Space" ) {
			color = flatten(vec4(rand(),rand(),rand(),1.0));
		}
	} );


	locScaling = gl.getUniformLocation(program,"vScaling");
	gl.uniform1f(locScaling, scaling);

	canvas.addEventListener("wheel", function(e){
		scaling = scaling + (e.deltaY/-114)*0.1;
		gl.uniform1f(locScaling, scaling);
    } );
	
	tMatrixLoc = gl.getUniformLocation(program,"tMatrix");
	gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));
	// Event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        mouseX = e.offsetX;
		mouseY = e.offsetY;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) { // skritid
			let dx = 2 * (e.offsetX - mouseX) / canvas.width;
        	let dy = 2 * (canvas.height - e.offsetY - mouseY) / canvas.height - 1;

			totalX += dx;
			totalY += dy;

			mouseX = e.offsetX;
			mouseY = e.offsetY;

			console.log(totalX,dy)

			tMatrix = translate(totalX,dy,0);
			gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));
		}
    } );


    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform4fv(locColor,color);
    gl.drawArrays( gl.POINTS, 0, points.length );

	window.requestAnimFrame(render);
}

