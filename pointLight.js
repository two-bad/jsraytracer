class _pointLight {
	constructor(base, pos, intensity) {
		this.base = base;
		this.pos = pos;
		this.intensity = intensity;
		this.type = `point`;
		activeScene.add(new _pointLightObject(this))
	}
}

class _pointLightObject {
	constructor(pLight) {
		this.pLight = pLight;
		this.pos = pLight.pos;
		this.type = `obj`;
		this.rad = 10;
		this.ID = activeScene.objects.length;
	}
	interact(ray) {
		let b = p5.Vector.dot(p5.Vector.mult(ray.direction, 2), p5.Vector.sub(ray.start, this.pos));
		let b2 = b * b;
		let a = p5.Vector.dot(ray.direction, ray.direction);
		a = a | 1
		let c = p5.Vector.dot(p5.Vector.sub(this.pos, ray.start), p5.Vector.sub(this.pos, ray.start)) - (this.rad * this.rad);
		let delta = b2 - (4 * a * c);

		if (delta < 0) {
			return false;
		} else {
			let t = (-b - sqrt(delta)) / (a << 1);
			if (t < 0) {
				return false;
			} else {
				let intersection = p5.Vector.add(ray.start, p5.Vector.mult(ray.direction, t));
				if (t < settings.renderDistance) {

					if (ray.type == `shadow`) {
						return false;
					}
					let normal = p5.Vector.sub(intersection, this.pos)
					let opp = p5.Vector.mult(ray.direction, -1)
					normal.normalize();
					let back = new _ray(ray.start, ray.direction, 0, `reflection`, this.ID);
					let alph = normal.dot(opp)**3;
					if(alph>0.7)alph=1;
					let col = [alph*this.pLight.base[0]+(1-alph)*back.colour[0], alph*this.pLight.base[1]+(1-alph)*back.colour[1], alph*this.pLight.base[2]+(1-alph)*back.colour[2], 255]
					return [col, intersection];
				}
				return false;
			}
		}
	}
}