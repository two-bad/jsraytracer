const vec3 = (j, k, l) => createVector(j, k, l);
const vec2 = (j, k) => createVector(j, k);
const l = c => console.log(c);
const s = () => push();
const e = () => pop();
const s3 = () => ctx3d.push();
const e3 = () => ctx3d.pop();
const sqDist2 = (vec1, vec2) => (vec1.x-vec2.x)**2+(vec1.z-vec2.z)**2
const mouseRect = (x, y, w, h) => mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
const mouseCirc = (x, y, r) => (mouseX-x)**2+(mouseY-y)**2 < r**2
const sqDist3 = (vec1, vec2) => (vec1.x-vec2.x)**2+(vec1.z-vec2.z)**2+(vec1.y-vec2.y)**2
const mod3 = (vec) => sqrt(vec.x**2+vec.y**2+vec.z**2)
const ran = n => round(random(n));
const ranBetween = (x, y) => Math.floor(Math.random() * (x - y + 1) + y);

const dotProduct = (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;

const squaredLength = (v) => v.x**2+v.y**2+v.z**2;


