import {Cube} from "./Cube.js"

var N; // NxNxN grid

function createMap(n) 
{
	N = n;
	var cubes = [];
	let percentSpawn = 0.2;
	let defaultColor = vec4(1.0,0.0,0.0,1.0); //red 
	let size = 2/n; // == 0.2
	for (var x = 0; x < n; x++) 
	{
		for (var y = 0; y < n; y++)
		{
			for (var z = 0; z < n; z++)
			{
				let gridPosition = vec3(x,y,z);
				let cube = new Cube(
					gridPosition, defaultColor, size)

				cube.translateCube(gridToScreen(x,y,z));

				if (Math.random() > percentSpawn) 
					cube.scaleCube(0.0)
				cubes.push(cube);
			}
		}
	}
	return cubes;
}

function loadCubes(cubes) {
	
	let points = []; 
	let colors = [];
	for (var i = 0; i < cubes.length; i++)
	{
		points.push(cubes[i].vertices);
		colors.push(cubes[i].color);
	}
	return [points.flat(2), colors]
}


function gridToScreen(x,y,z)
{ // x,y,z ----> [-1,1](xyz) : mat4
	let X = (x / N) * 2 - 1;
	let Y = (y / N) * 2 - 1;
	let Z = (z / N) * 2 - 1;
	console.assert(X < 1 || X > -1 || Y < 1 || Y > -1 || Z > 1 || Z < -1 , "gridToScreenIssue");
	return translate(X,Y,Z)
} 

export { createMap , loadCubes}
