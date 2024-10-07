
var cubeSize;

class Cube
{
	constructor(gridPosition, color, size)
	{
		cubeSize = size;

		// vec3(x,y,z)
		this.gridPosition = gridPosition; 

		// vec4(r,g,b,o)
		this.color = color; 		

		this.vertices = colorCube();

		// mat4 
		this.transform = mat4(); 


	}
	
	
	scaleCube(scale)
	{
		this.transform = mult(this.transform, scalem(scale,scale,scale));
	}

	translateCube(x,y,z)
	{
		this.transform = mult(this.transform, translate(x,y,z));
	}
}



function colorCube()
{
	var allPoints = [];
    allPoints.push( quad( 1, 0, 3, 2 ) );
    allPoints.push( quad( 2, 3, 7, 6 ) );
    allPoints.push( quad( 3, 0, 4, 7 ) );
    allPoints.push( quad( 6, 5, 1, 2 ) );
    allPoints.push( quad( 4, 5, 6, 7 ) );
    allPoints.push( quad( 5, 4, 0, 1 ) );
	return allPoints;
}

function quad(a,b,c,d) 
{
	var points = [];
    var vertices = [
        vec3( -cubeSize, -cubeSize,  cubeSize ),
        vec3( -cubeSize,  cubeSize,  cubeSize ),
        vec3(  cubeSize,  cubeSize,  cubeSize ),
        vec3(  cubeSize, -cubeSize,  cubeSize ),
        vec3( -cubeSize, -cubeSize, -cubeSize ),
        vec3( -cubeSize,  cubeSize, -cubeSize ),
        vec3(  cubeSize,  cubeSize, -cubeSize ),
        vec3(  cubeSize, -cubeSize, -cubeSize )
    ];

	var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < 6; ++i ) {
        points.push( vertices[indices[i]] ); // why do we have 36 points instead of 24
    }
	return points;
}

export {Cube}
