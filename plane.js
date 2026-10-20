class _plane {
	constructor(pos, normal, material) {
		this.pos = pos;
		this.normal = normal.normalize();
		this.material = material;
		this.type = `obj`;
		this.ID = activeScene.objects.length;

	}
	interact(ray) {
		let denom = ray.direction.dot(this.normal);
		if (abs(denom) < 1e-6) {
			return false;
		}
		let t = p5.Vector.sub(this.pos, ray.start).dot(this.normal) / denom;

		if (t < 0) {
			return false;
		}
		let intersection = p5.Vector.add(ray.start, p5.Vector.mult(ray.direction, t));
		if(t<settings.renderDistance) {
			if (ray.type == `shadow`) {
				return [this.ID, intersection];

			}
			return [this.material.calculate(intersection, this.normal, this.ID, ray), intersection];
		}
		return false;
	}
}

class _optimalPlane {
	constructor(condition, normal, lessThan, material) {
		this.condition = condition;
		this.normal = normal;
		this.lessThan = lessThan;
		this.material = material;
		this.type = `obj`;
		this.ID = activeScene.objects.length;
	}
	interact(ray) {
		
	}
}