class _sphere {
	constructor(pos, rad, material) {
		this.pos = pos;
		this.rad = rad;
		this.type = `obj`;
		this.material = material;
		this.ID = activeScene.objects.length;
	}
	interact(ray) {
		if(ray.count<3) {
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
							return [this.ID, intersection];
						}
						let normal = p5.Vector.sub(intersection, this.pos);
						normal.normalize();
						return [this.material.calculate(intersection, normal, this.ID, ray), intersection];
					}
				}
			}
		}
					return false;
		
	}
}