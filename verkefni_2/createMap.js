import {Cube} from "./Cube.js"

var N; // NxNxN grid
var cubeSize;
var cubePadding;


function howManyNeighbors(cube, cubes)
{
	let x = cube.gridPosition[0];
	let y = cube.gridPosition[1];
	let z = cube.gridPosition[2];
	var neighborCount = 0;
	
	for (var i = x-1; i <= x+1; i++) 
	{
		for (var j = y-1; j <= y+1; j++)
		{
			for (var k = z-1; k <= z+1; k++)
			{
				if (k >= 0 && j >= 0 && i >= 0) // out of bounds checker
				
					if (k < N && j < N && i < N) // out of bounds
					{
						if (getCubeFromPosition(i,j,k, cubes).isAlive) neighborCount++;
					}
				}
			}
		}
	return neighborCount - 1; // not counting self
}

// no need to reintialize variables each time
var dead = vec4(0.93,0.16, 0.22, 1.0); // imperial red
let alive5 = vec4(0.46,0.58,0.36,1.0); // russian green
var alive6 = vec4(0.23, 0.79, 0.42, 1.0); // UFO green
var alive7 = vec4(0.0,1.0,0.5); // guppie green

function countToColor(count) 
{
	if (count == 5) return alive5;
	else if (count == 6) return alive6;
	else if (count == 7) return alive7;
	else return dead;

}

function getCubeFromPosition(x, y, z, cubes) {
    for (let i = 0; i < cubes.length; i++) {
        let cube = cubes[i];
        let cubePos = cube.gridPosition;
        if (cubePos[0] === x && cubePos[1] === y && cubePos[2] === z) {
            return cube; 
        }
    }
    return null; 
}


function createGrid(n)
{ // technically creates all the cubes
	N = n;
	var cubes = [];
	let percentSpawn = 0.3; // 30%
	let defaultColor = vec4(0.7,0.7,0.7,1.0); //background color
	for (var x = 0; x < n; x++) 
	{
		for (var y = 0; y < n; y++)
		{
			for (var z = 0; z < n; z++)
			{
				let gridPosition = vec3(x,y,z);
				let cube = new Cube(
					gridPosition, defaultColor, N)

				if (Math.random() < percentSpawn) 
				{
					cube.isAlive = true;
					cube.currentSize = 1.0;
				}
				cubes.push(cube);
			}
		}
	}
	return cubes;
}

function getCubePoints(size)
{ // only called once i think
	cubeSize = size;
	cubePadding = cubeSize / 15;
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
	let boxSize = cubeSize - cubePadding;
    var vertices = [
        vec3( -boxSize, -boxSize,  boxSize ),
        vec3( -boxSize,  boxSize,  boxSize ),
        vec3(  boxSize,  boxSize,  boxSize ),
        vec3(  boxSize, -boxSize,  boxSize ),
        vec3( -boxSize, -boxSize, -boxSize ),
        vec3( -boxSize,  boxSize, -boxSize ),
        vec3(  boxSize,  boxSize, -boxSize ),
        vec3(  boxSize, -boxSize, -boxSize )
    ];

	var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < 6; i++ ) {
        points.push( vertices[indices[i]] ); 
    }
	return points;
}

export { createGrid, getCubePoints, howManyNeighbors, countToColor}
