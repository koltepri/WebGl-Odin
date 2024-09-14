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

}

class Bullet 
{
	constructor(player)
	{
		this.x = (2*player.x+player.w)/2 - 0.02;
		this.y = player.y+player.h;
		this.w = 0.02;
		this.h = 0.02;
		this.position = createRect(this.x,this.y,this.w,this.h);
		this.speed = 0.03;
	}

	updatePosition()
	{
		this.y = this.y + this.speed;
		this.position = createRect(this.x,this.y,this.w,this.h);
	}
}

export {Player,Bullet}
