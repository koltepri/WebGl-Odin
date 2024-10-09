
var cubeSize;

class Cube
{
	constructor(gridPosition, color, size)
	{
		cubeSize = size; // Cubes must be created before we initialize the point buffer

		// mat4 
		this.transform = mat4(); 

		// vec3(x,y,z)
		this.gridPosition = gridPosition; 
		initialTranslate();

		// vec4(r,g,b,o)
		this.color = color; 		

	}
	
	
	scaleCube(scale)
	{
		this.transform = mult(this.transform, scalem(scale,scale,scale));
	}


	translateCube(x,y,z)
	{
		this.transform = mult(this.transform, translate(x,y,z));
	}

	initialTranslate()
	{
		let x = this.gridPosition.x;
		let y = this.gridPosition.y;
		let z = this.gridPosition.z;
		
		let X = (x / N) * 2 - 1;
		let Y = (y / N) * 2 - 1;
		let Z = (z / N) * 2 - 1;
		console.assert(X < 1 || X > -1 || Y < 1 || Y > -1 || Z > 1 || Z < -1 , "gridToScreenIssue");
		translateCube(X,Y,Z);
	}
}

function getCubePoints()
{
	var allPoints = [];
    allPoints.push( quad( 1, 0, 3, 2 ) );
    allPoints.push( quad( 2, 3, 7, 6 ) );
    allPoints.push( quad( 3, 0, 4, 7 ) );
    allPoints.push( quad( 6, 5, 1, 2 ) );
    allPoints.push( quad( 4, 5, 6, 7 ) );
    allPoints.push( quad( 5, 4, 0, 1 ) );
	return allPoints.flat(2);
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
        points.push( vertices[indices[i]] ); 
    }
	return points;
}

export {Cube, getCubePoints}
