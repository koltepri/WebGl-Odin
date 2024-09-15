import {createRect} from "./helpers.js"


class Bird
{
	constructor(xVelocity) 
	{
		this.width = 0.07;
		this.height = 0.07;
		this.xVelocity = xVelocity;
		this.x = Math.random() * (2-this.width) - 1;
		this.y = Math.random() * (1 - (-0.4-this.height)) + (-0.4); // ekki player area
		this.birdBox = createRect(this.x,this.y,this.width,this.height);
	}

	updateBirdPosition()
	{
    	this.x += this.xVelocity; 
		this.birdBox = createRect(this.x,this.y,this.width,this.height);
	}

	isOutOfBounds() 
	{
		// stærri tala en 1 og -1 svo að það sé ekki svo mikið chaos
		let boundsLeft = this.x+this.width < -1.4;
		let boundsRight = this.x > 1.2;
		return boundsLeft || boundsRight;
	}
}

export { Bird };

