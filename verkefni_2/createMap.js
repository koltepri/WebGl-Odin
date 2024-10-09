import {Cube} from "./Cube.js"

var N; // NxNxN grid
var cubeSize;

function createGrid(n)
{ // technically creates all the cubes
	N = n;
	var cubes = [];
	let percentSpawn = 0.2; // 20%
	let defaultColor = vec4(1.0,0.0,0.0,1.0); //red 
	for (var x = 0; x < n; x++) 
	{
		for (var y = 0; y < n; y++)
		{
			for (var z = 0; z < n; z++)
			{
				let gridPosition = vec3(x,y,z);
				let cube = new Cube(
					gridPosition, defaultColor, N)

				if (Math.random() > percentSpawn) 
					cube.scaleCube(0.0)
				cubes.push(cube);
			}
		}
	}
	return cubes;
}

function getCubePoints(size)
{
	cubeSize = size;
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

    for ( var i = 0; i < 6; i++ ) {
        points.push( vertices[indices[i]] ); 
    }
	return points;
}

export { createGrid, getCubePoints }
