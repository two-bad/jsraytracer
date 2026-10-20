class scene {
	constructor(w, h, camera) {
		this.objects = [];
		this.lights = [];
		this.w = w;
		this.h = h;
		this.camera = camera;
		this.rendered = false;
		this.level = 0;
		let halfX = this.w/2
		let halfY = this.h/2;
		this.fog = null;
		this.camera.pos = vec3(halfX, halfY, -(halfX));
	}
	add(object) {
		this.objects.push(object)
	}
	addLight(light) {
		this.lights.push(light)
	}
	render() {
		
		img.loadPixels();
		for (let x = 0; x < 512; x++) { // noprotect
			for (let y = this.level; y < this.level+16; y++) { // noprotect
				if(settings.perspective == `ortho`) {
					this.camera.pos.x = x;
					this.camera.pos.y = y;
				}
				const direction = vec3(x-this.camera.pos.x, y-this.camera.pos.y, -this.camera.pos.z).normalize();
				let ray = new _ray(this.camera.pos, direction, 0, `camera`, null);
				let pix = ray.colour;
				let index = y * 4 * 512 + x * 4;
				img.pixels[index] = pix[0]
				img.pixels[index+1] = pix[1]
				img.pixels[index+2] = pix[2]
				img.pixels[index+3] = pix[3]
			
			}
		}
		if(this.level == 512) {
			this.rendered = true
			//antiAliasEdges(detectEdges(), 1);
			fxaa(5)
		}
		this.level+=16
		img.updatePixels();
	}
}