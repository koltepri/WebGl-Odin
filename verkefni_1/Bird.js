import {createRect} from "./helpers.js"


class Bird
{
	constructor(xVelocity) 
	{
		this.width = 0.1;
		this.height = 0.1;
		this.birdBox = this.createBird();
		this.xVelocity = xVelocity;
		this.x = Math.random() * (2-this.width) - 1;
		this.y = Math.random() * (1 - (-0.4-this.height)) + (-0.4); // ekki player area
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
		this.birdBox = createRect(this.x+this.xVelocity,this.y,this.width,this.height)
	}
}

export { Bird };
