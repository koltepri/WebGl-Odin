import {createRect,createTriangle} from "./helpers.js"


class Player
{
	constructor() 
	{
		this.x = -0.06;
		this.y = -0.97;
		this.w = 0.15;
		this.h = 0.36;
		this.position = createTriangle(this.x,this.y,this.w,this.h);
	}

	movePlayerX(xOffset)
	{
		this.x = this.x + xOffset;
		this.position = createTriangle(this.x,this.y,this.w,this.h);
	}

	getPosition()
	{
		return this.position;
	}

}

export {Player}
