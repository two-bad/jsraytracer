class _fog {
	constructor(base, density, type) {
		this.base = base;
		this.density = density;
		this.type = type;
	}
	apply(col, distance) {
		let f;
		if (this.type === "linear") {
			let maxDistance = 100;
			f = constrain(distance / maxDistance, 0, 1);
		}
		if (this.type === "exponential") {
			f = 1 - exp(-this.density * distance);
		}
		return [col[0] * (1 - f) + (this.base[0] * f), col[1] * (1 - f) + (this.base[1] * f), col[2] * (1 - f) + (this.base[2] * f), 255];

	}
}
