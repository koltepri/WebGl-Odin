import {Cube} from "./Cube.js"

var N; // NxNxN grid

function createGrid(n)
{ // technically creates all the cubes
	N = n;
	var cubes = [];
	let percentSpawn = 0.2; // 20%
	let defaultColor = vec4(1.0,0.0,0.0,1.0); //red 
	let size = 1/n; // the side length of each cube, 2 fills up the entire canvas
	for (var x = 0; x < n; x++) 
	{
		for (var y = 0; y < n; y++)
		{
			for (var z = 0; z < n; z++)
			{
				let gridPosition = vec3(x,y,z);
				let cube = new Cube(
					gridPosition, defaultColor, size)

				if (Math.random() > percentSpawn) 
					cube.scaleCube(0.0)
				cubes.push(cube);
			}
		}
	}
	return cubes;
}

export { createGrid }
