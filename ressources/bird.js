export default function Bird() {   
	const geometry = new THREE.SphereGeometry(10, 32, 16 ); 
    const material = new THREE.MeshPhongMaterial( { color: 0xb20000 } ); 
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
}