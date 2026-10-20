class _reflectiveMaterial {
	constructor(base, reflectivity) {
		this.base = base;
		this.reflectivity = reflectivity;
		this.type = `reflective`;
	}
	calculate(intersection, normal, ID, ray) {
		let reflectCoeff = 1 - this.reflectivity;
		let noLights = activeScene.lights.length;
		let base = [...this.base];
		let ref;
		if (ray.count > 3) {
			ref = [...backgroundColour]
		} else {
			ref = new _ray(intersection, p5.Vector.reflect(ray.direction, normal), ray.count + 1, `reflection`, ID).colour;
			//ref = new _ray(intersection, normal, ray.count + 1, `reflection`, ID).colour;
		}
		if (noLights == 0) {
			return [0, 0, 0, 255]
		}
		let contribution = [0, 0, 0, 255]
		for (let i = 0; i < noLights; i++) {
			let light = activeScene.lights[i];

			if (light.type == `ambient`) {
				contribution[0] += light.base[0] * light.intensity
				contribution[1] += light.base[1] * light.intensity
				contribution[2] += light.base[2] * light.intensity
			}
			if (light.type == `directional`) {
				let direction = vec3(-light.direction.x, -light.direction.y, -light.direction.z)
				let theta = acos(direction.dot(normal));
				let intensity = light.intensity * (1 - (theta / HALF_PI))
				let obscured = new _ray(intersection, direction, 0, `shadow`, ID).colour

				if (obscured || intensity < 0) {
					intensity = 0;
				}
				contribution[0] += light.base[0] * intensity;
				contribution[1] += light.base[1] * intensity;
				contribution[2] += light.base[2] * intensity;
			}
			if (light.type == `point`) {
				let direction = vec3(-intersection.x + light.pos.x, -intersection.y + light.pos.y, -intersection.z + light.pos.z)
				direction.normalize();
				let theta = acos(direction.dot(normal));
				let intensity = light.intensity * (1 - (theta / HALF_PI))
				//let obscured = new _ray(intersection, direction, 0, `shadow`, ID).colour
				let obscured = false
				let result = new _ray(intersection, direction, 0, `shadow`, ID)
				if (result.shortest != null) {
					if (result.shortest < sqDist3(intersection, light.pos)) {
						obscured = true;
					}
				}
				if (obscured || intensity < 0) {
					intensity = 0;
				}
				
				contribution[0] += light.base[0] * intensity;
				contribution[1] += light.base[1] * intensity;
				contribution[2] += light.base[2] * intensity;
			}
		}
		contribution[0] /= 255
		contribution[1] /= 255
		contribution[2] /= 255
		return [contribution[0] * (ref[0] * this.reflectivity + base[0] * reflectCoeff), contribution[1] * (ref[1] * this.reflectivity + base[1] * reflectCoeff), contribution[2] * (ref[2] * this.reflectivity + base[2] * reflectCoeff), 255];

	}
}

class _waterMaterial {
	constructor(base, reflectivity) {
		this.base = base;
		this.reflectivity = 1;
		this.type = `reflective`;
	}
	calculate(intersection, normal, ID, ray) {
		normal.x *= -1;
		normal.y *= -1;
		normal.z *= -1;
		let reflectCoeff = 1 - this.reflectivity;
		let noLights = activeScene.lights.length;
		let base = [...this.base];
		let ref;
		if (ray.count > 3) {
			ref = [...backgroundColour]
		} else {
			ref = new _ray(intersection, p5.Vector.reflect(ray.direction, normal), ray.count + 1, `reflection`, ID).colour;
		}
		if (noLights == 0) {
			return [0, 0, 0, 255]
		}
		let contribution = [0, 0, 0, 255]
		for (let i = 0; i < noLights; i++) {
			let light = activeScene.lights[i];

			if (light.type == `ambient`) {
				contribution[0] += light.base[0] * light.intensity
				contribution[1] += light.base[1] * light.intensity
				contribution[2] += light.base[2] * light.intensity
			}
			if (light.type == `directional`) {
				let direction = vec3(-light.direction.x, -light.direction.y, -light.direction.z)
				let theta = acos(direction.dot(normal));
				let intensity = light.intensity * (1 - (theta / HALF_PI))
				let obscured = new _ray(intersection, direction, 0, `shadow`, ID).colour

				if (obscured || intensity < 0) {
					intensity = 0;
				}
				contribution[0] += light.base[0] * intensity;
				contribution[1] += light.base[1] * intensity;
				contribution[2] += light.base[2] * intensity;
			}
			if (light.type == `point`) {
				let direction = vec3(-intersection.x + light.pos.x, -intersection.y + light.pos.y, -intersection.z + light.pos.z)
				direction.normalize();
				let theta = acos(direction.dot(normal));
				let intensity = light.intensity * (1 - (theta / HALF_PI))
				//let obscured = new _ray(intersection, direction, 0, `shadow`, ID).colour
				let obscured = false
				let result = new _ray(intersection, direction, 0, `shadow`, ID)
				if (result.shortest != null) {
					if (result.shortest < sqDist3(intersection, light.pos)) {
						obscured = true;
					}
				}
				if (obscured || intensity < 0) {
					intensity = 0;
				}
				
				contribution[0] += light.base[0] * intensity;
				contribution[1] += light.base[1] * intensity;
				contribution[2] += light.base[2] * intensity;
			}
		}
		contribution[0] /= 255
		contribution[1] /= 255
		contribution[2] /= 255
		return [contribution[0] * (ref[0] * this.reflectivity + base[0] * reflectCoeff), contribution[1] * (ref[1] * this.reflectivity + base[1] * reflectCoeff), contribution[2] * (ref[2] * this.reflectivity + base[2] * reflectCoeff), 255];

	}
}