class _model {
	constructor(geometry, scale, offset, material) {
		this.geometry = geometry;
		this.scale = scale;
		this.offset = offset;
		this.type = `obj`;
		this.material = material;
		this.bounds = [
			[null, null],
			[null, null],
			[null, null]
		];
		this.ID = activeScene.objects.length;
		for (let i = 0; i < this.geometry.vertices.length; i++) {
			this.geometry.vertices[i].mult(this.scale)
			this.geometry.vertices[i].add(this.offset)
		}
		for (let i = 0; i < this.geometry.vertices.length; i++) {
			let vert = this.geometry.vertices[i]
			if (this.bounds[0][0] == null) {
				this.bounds[0][0] = vert.x;
				this.bounds[0][1] = vert.x;
				this.bounds[1][0] = vert.y;
				this.bounds[1][1] = vert.y;
				this.bounds[2][0] = vert.z;
				this.bounds[2][1] = vert.z;
			}
			if (vert.x < this.bounds[0][0]) this.bounds[0][0] = vert.x;
			if (vert.x > this.bounds[0][1]) this.bounds[0][1] = vert.x;
			if (vert.y < this.bounds[1][0]) this.bounds[1][0] = vert.y;
			if (vert.y > this.bounds[1][1]) this.bounds[1][1] = vert.y;
			if (vert.x < this.bounds[2][0]) this.bounds[2][0] = vert.z;
			if (vert.x > this.bounds[2][1]) this.bounds[2][1] = vert.z;
		}

	}
	interact(ray) {
		if (ray.boundingBox(this.bounds)) {
			let results = [];
			for (let i = 0; i < this.geometry.faces.length; i++) {
				let face = this.geometry.faces[i];
				if (ray.direction.dot(this.geometry.vertexNormals[face[0]]) >= 0) {
					let intersection = rayTriangle(this.geometry.vertices[face[0]], this.geometry.vertices[face[1]], this.geometry.vertices[face[2]], this.geometry.vertexNormals[face[0]], ray)
					if (intersection != false) {
						if (ray.type == `shadow`) {
							return [this.ID, intersection];
						}
						results.push([this.material.calculate(intersection, p5.Vector.mult(this.geometry.vertexNormals[face[0]], -1), this.ID, ray), intersection]);
					}
				}
			}
			let index = null;
			let shortest = null;
			let distances = [];
			if (results.length > 0) {

				for (let i = 0; i < results.length; i++) {
					distances.push(sqDist3(results[i][1], ray.start))
				}
				for (let i = 0; i < distances.length; i++) {
					if (shortest == null || distances[i] < shortest) {
						shortest = distances[i]
						index = i
					}
				}
				return results[index]
			}

		}
		return false
	}
}

