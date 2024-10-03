import {Cube} from "./Cube.js"

var N; // NxNxN grid

function createMap(width,height,n) 
{
	N = n;
	var cubes = [];
	let percentSpawn = 0.2;
	let defaultColor = vec4(1.0,0.0,0.0,1.0); //red 
	let size = 2/n;
	for (x = 0; x < n; x++) 
	{
		for (y = 0; y < n; y++)
		{
			for (z = 0; z < n; z++)
			{
				let gridPosition = vec3(x,y,z);
				let screenPosition = gridToScreen(x,y,z);
				let cube = new Cube(
					gridPosition, defaultColor, screenPosition, size)

				if (Math.random() > percentSpawn) 
					cube.scaleCube(0.0)
			}
		}
	}
}


function gridToScreen(x,y,z)
{ // x,y,z ----> [-1,1](xyz) : mat4
	let X = (x / N) * 2 - 1;
	let Y = (y / N) * 2 - 1;
	let Z = (z / N) * 2 - 1;
	console.assert(X < 1 || X > -1 || Y < 1 || Y > -1 || Z > 1 || Z < -1 , "gridToScreenIssue");
	return translate(X,Y,Z)
} 
