


class Cube
{
	constructor(gridPosition, color, transform, size)
	{
		// vec3(x,y,z)
		this.gridPosition = gridPosition; 

		// vec4(r,g,b,o)
		this.color = color; 		

		// ??
		this.vertices = colorCube(size);

		// mat4 ???
		this.transform = transform;

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

function quad(size) 
{
	var points = [];
    var vertices = [
        vec3( -size, -size,  size ),
        vec3( -size,  size,  size ),
        vec3(  size,  size,  size ),
        vec3(  size, -size,  size ),
        vec3( -size, -size, -size ),
        vec3( -size,  size, -size ),
        vec3(  size,  size, -size ),
        vec3(  size, -size, -size )
    ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
    }
	return points;
}

export {Cube}
