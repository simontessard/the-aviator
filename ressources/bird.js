export default function Bird() {   
	const geometry = new THREE.SphereGeometry(10, 32, 16 ); 
    const material = new THREE.MeshBasicMaterial( { color: 0xff6600 } ); 
    this.mesh = new THREE.Mesh( geometry, material ); 
}
