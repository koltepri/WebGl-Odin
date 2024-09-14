
// using a love2d coordinate system, with (0,0) in the top left corner
// using a world coordinate system but width and height is defined in percentages
function createRect(x,y,w,h)
{
	let p0 = vec2(x,y);
	let p1 = vec2(x+w*2,y);
	let p2 = vec2(x+w*2,y-h*2);
	let p3 = vec2(x,y-h*2);
	let t1 = [p0,p1,p2];
	let t2 = [p0,p2,p3];
	return [t1,t2]
}

function createTriangle(x,y,w,h)
{
	let p0 = vec2(x,y);
	let p1 = vec2(x+w,y);
	let p2 = vec2((w+x+x)/2,y+h);
	console.log(p0,p1,p2);
	return [p0,p1,p2];
}

export {createRect, createTriangle};
