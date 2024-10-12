
class Cube
{
	constructor(gridPosition, color, n)
	{
		// mat4 
		this.transform = mat4();

		// vec3(x,y,z)
		this.gridPosition = gridPosition; 
		this.initialTranslate(n);

		// vec4(r,g,b,o)
		this.color = color; 		
		this.isAlive = false;
		this.currentNeightbors;

		this.currentSize = 0.0;

	}

	changeCubeSize(ds) // better to handle the logic in the controller?
	{
		if (this.isAlive && this.currentSize < 1.0) {
			this.currentSize = this.currentSize + ds; // spawning 
		}
		else if (!this.isAlive && this.currentSize > 0.0) {
			this.currentSize = this.currentSize - ds; // dying
		}

		// Clamp the size between 0.0 and 1.0 to prevent going out of bounds
    	this.currentSize = Math.max(0.0, Math.min(1.0, this.currentSize));
	}
	getTransformM() // scaling needs to happen last, don't save the scaling variable to avoid multiplying by 0
	{
		let s = this.currentSize;
		return mult(this.transform, scalem(s,s,s));
	}

	scaleCube(scale)
	{
		this.transform = mult(this.transform, scalem(scale,scale,scale));
	}


	translateCube(x,y,z)
	{
		this.transform = mult(this.transform, translate(x,y,z));
	}

	initialTranslate(N)
	{
		let x = this.gridPosition[0];
		let y = this.gridPosition[1];
		let z = this.gridPosition[2];
		
		let X = (x / N) * 2 - 1;
		let Y = (y / N) * 2 - 1;
		let Z = (z / N) * 2 - 1;
		console.assert(X < 1 || X > -1 || Y < 1 || Y > -1 || Z > 1 || Z < -1 , 
			"gridToScreenIssue" + "X:" + X + " Y:" + Y + " Z:" + Z);
		this.translateCube(X,Y,Z);
	}
}


export { Cube }
