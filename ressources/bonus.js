var Colors = {
	blue:0x173AD4,
    darkBlue:0x021C88,
};

export default function Bonus() {   
    const geometry = new THREE.SphereGeometry(6, 32, 16 ); 
    const material = new THREE.MeshPhongMaterial( { color: Colors.darkBlue } ); 
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Create a second sphere
    const secondMaterial = new THREE.MeshPhongMaterial( { color: Colors.blue } ); // Use the new color for the second sphere
    const secondSphere = new THREE.Mesh(geometry, secondMaterial);
    secondSphere.position.x = -6; // Position the second sphere next to the first one
    secondSphere.position.y = -5; // Position the second sphere next to the first one
    secondSphere.position.z = -1; // Position the second sphere next to the first one
    secondSphere.castShadow = true;
    secondSphere.receiveShadow = true;

    // Add the second sphere to the first sphere's mesh
    this.mesh.add(secondSphere);
}