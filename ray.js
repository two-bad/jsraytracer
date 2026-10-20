class _ray {
	constructor(start, direction, count, type, IDExcept) {
		this.start = start;
		this.type = type
		this.direction = direction;
		//if(direction.z<0&&this.type!=`shadow`) l(direction.z);
		this.count = count;
		this.IDExcept = IDExcept;
		this.colour = [...backgroundColour];
		if (this.type == `shadow`) {
			this.colour = false;
		}
		this.results = [];
		this.distances = [];
		for (let i = 0; i < activeScene.objects.length; i++) { //noprotect
			let thisObject = activeScene.objects[i]
			if (thisObject.type == `obj`) {
				if (thisObject.ID != this.IDExcept) {
					let result = thisObject.interact(this)
					if (result != false) {
						if (this.type == `shadow`) {
							// this.colour = true
							// i = 99999
							this.results.push(result)

						} else {
							this.results.push(result)
						}
					}
				}
			}
		}
		this.index = null;
		this.shortest = null;
		if (this.results.length > 0) {

			for (let i = 0; i < this.results.length; i++) {
				this.distances.push(sqDist3(this.results[i][1], this.start))
			}
			for (let i = 0; i < this.distances.length; i++) {
				if (this.shortest == null || this.distances[i] < this.shortest) {
					this.shortest = this.distances[i]
					this.index = i
				}
			}
			this.colour = activeScene.fog.apply(this.results[this.index][0], this.shortest)
		}
	}
	boundingBox(boundingBox) {
		let min = vec3(boundingBox[0][0], boundingBox[1][0], boundingBox[2][0]);
		let max = vec3(boundingBox[0][1], boundingBox[1][1], boundingBox[2][1]);
		let tMin = (min.x - this.start.x) / this.direction.x;
		let tMax = (max.x - this.start.x) / this.direction.x;
		if (tMin > tMax) {
			[tMin, tMax] = [tMax, tMin];
		}
		let tyMin = (min.y - this.start.y) / this.direction.y;
		let tyMax = (max.y - this.start.y) / this.direction.y;
		if (tyMin > tyMax)[tyMin, tyMax] = [tyMax, tyMin];
		if ((tMin > tyMax) || (tyMin > tMax)) {
			return false;
		}
		tMin = Math.max(tMin, tyMin);
		tMax = Math.min(tMax, tyMax);
		let tzMin = (min.z - this.start.z) / this.direction.z;
		let tzMax = (max.z - this.start.z) / this.direction.z;
		if (tzMin > tzMax) {
			[tzMin, tzMax] = [tzMax, tzMin];
		}
		if ((tMin > tzMax) || (tzMin > tMax)) {
			return false;
		}
		return true;
	}
}

