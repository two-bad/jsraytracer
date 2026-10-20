class _directionalLight {
	constructor(base, direction, intensity) {
		this.base = base;
		this.direction = direction.normalize();
		this.intensity = intensity;
		this.type = `directional`;
	}
	calculate() {

	}
}