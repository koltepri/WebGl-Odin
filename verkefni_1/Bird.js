import {createRect} from "./helpers.js"


class Bird
{
	constructor(xVelocity) 
	{
		this.width = 0.1;
		this.height = 0.1;
		this.xVelocity = xVelocity;
		this.x = Math.random() * (2-this.width) - 1;
		this.y = Math.random() * (1 - (-0.4-this.height)) + (-0.4); // ekki player area
		this.birdBox = this.createBird();
	}
	
	createBird()
	{
		return createRect(this.x,this.y,this.width,this.height);
	}

	getBirdBox()
	{
		return this.birdBox;
	}

	updateBirdPosition()
	{
    	this.x += this.xVelocity; 
		this.birdBox = createRect(this.x,this.y,this.width,this.height);
	}
	isOutOfBounds() 
	{
		let boundsLeft = this.x+this.width < -1.0;
		let boundsRight = this.x > 1.0;
		return boundsLeft || boundsRight;
	}
}

export { Bird };

