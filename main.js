let img, activeScenes;
let objs = [];
let backgroundColour = [150, 150, 200, 255];
const cache = [];


var preload = () => {
	objs.push(loadModel(`pawn1.obj`))
}

var setup = () => {

	createCanvas(512, 512);
	img = createGraphics(512, 512);
	img.pixelDensity(1)
	img.smooth(8)

	activeScene = new scene(512, 512, new _camera(90));
	activeScene.fog =  new _fog([200, 200, 200, 255], 0.000003, `exponential`)
	activeScene.add(new _sphere(vec3(256, 250, 100), 50, new _reflectiveMaterial([200, 150, 150, 255], 1)))
	activeScene.add(new _sphere(vec3(256, 180, 100), 20, new _reflectiveMaterial([0, 0, 255, 255], 0.6)))
	 activeScene.add(new _sphere(vec3(400, 250, 150), 50, new _standardMaterial([150, 200, 150, 255])))
	activeScene.add(new _plane(vec3(256, 300, 256), vec3(0, -1, 0), new _reflectiveMaterial([150, 200, 150, 255], 0.5)))
	activeScene.add(new _plane(vec3(256, 100, 256), vec3(0, 1, 0), new _standardMaterial([240, 100, 100, 255])))
	activeScene.add(new _plane(vec3(256, 100, 400), vec3(0, 0, -1), new _standardMaterial([240, 150, 220, 255])))
	activeScene.add(new _plane(vec3(0, 100, 400), vec3(1, 0, 0), new _standardMaterial([240, 240, 20, 255])))
	activeScene.add(new _plane(vec3(512, 100, 400), vec3(-1, 0, 0), new _reflectiveMaterial([150, 240, 240, 255], 0.7)))
	activeScene.add(new _model(objs[0], -20, vec3(200, 300, 50), new _reflectiveMaterial([255, 255, 255, 255], 0.9)))
	
	activeScene.addLight(new _ambientLight([255, 255, 255, 255], 0.5))
	activeScene.addLight(new _pointLight([255, 255, 255, 255], vec3(150, 150, -100), 0.5))
	activeScene.addLight(new _pointLight([255, 255, 255, 255], vec3(350, 150, 0), 0.5))
	activeScene.render();
}

var draw = () => {
	if (activeScene.rendered == false) {
		activeScene.render();
	}
	image(img, 0, 0)
}





const rayTriangle = (a, b, c, normal, ray) => {
	let denom = ray.direction.dot(normal);
	if (abs(denom) < 1e-6) {
		return false;
	}
	let t = p5.Vector.sub(a, ray.start).dot(normal) / denom;
	if (t < 0) {
		return false;
	}
	let intersection = p5.Vector.add(ray.start, p5.Vector.mult(ray.direction, t));
	let ab = vec3(b.x - a.x, b.y - a.y, b.z - a.z)
	let bc = vec3(c.x - b.x, c.y - b.y, c.z - b.z)
	let ca = vec3(a.x - c.x, a.y - c.y, a.z - c.z)
	let ap = vec3(intersection.x - a.x, intersection.y - a.y, intersection.z - a.z)
	let bp = vec3(intersection.x - b.x, intersection.y - b.y, intersection.z - b.z)
	let cp = vec3(intersection.x - c.x, intersection.y - c.y, intersection.z - c.z)
	let aTest = ab.cross(ap)
	let bTest = bc.cross(bp)
	let cTest = ca.cross(cp)
	let acond = aTest.dot(normal) >= -0.001
	let bcond = bTest.dot(normal) >= -0.001
	let ccond = cTest.dot(normal) >= -0.001
	
	if (acond && bcond && ccond) {
		//l(intersection)
	//	noLoop()
		return intersection;
		
	}
	return false;
}