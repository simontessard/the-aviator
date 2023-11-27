import Pilot from "./pilot.js";

var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	brownDark:0x23190f,
	dark:0x000000,
};

export default function AirPlane() {
	
	this.mesh = new THREE.Object3D();

	// Create the pilot
	var pilot = new Pilot();
    pilot.mesh.position.set(0, 29, 0);
    this.mesh.add(pilot.mesh);
	
    // Create the cabin
	var geomCockpit = new THREE.BoxGeometry(80,50,50,1,1,1);
	var matCockpit = new THREE.MeshStandardMaterial({color:Colors.red, flatShading:true});
	var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;
	this.mesh.add(cockpit);
	
	// Create the engine
	var geomEngine = new THREE.BoxGeometry(20,50,50,1,1,1);
	var matEngine = new THREE.MeshStandardMaterial({color:Colors.white, flatShading:true});
	var engine = new THREE.Mesh(geomEngine, matEngine);
	engine.position.x = 50;
	engine.castShadow = true;
	engine.receiveShadow = true;
	this.mesh.add(engine);
	
	// Create the tail
	var geomTailPlane = new THREE.BoxGeometry(15,20,5,1,1,1);
	var matTailPlane = new THREE.MeshStandardMaterial({color:Colors.red, flatShading:true});
	var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
	tailPlane.position.set(-42,25,0);
	tailPlane.castShadow = true;
	tailPlane.receiveShadow = true;
	this.mesh.add(tailPlane);

	// Create the wheels
	var geomWheelPlane = new THREE.BoxGeometry(25,25,5,1,1,1);
	var matWheelPlane = new THREE.MeshStandardMaterial({color:Colors.dark, flatShading:true});
	var WheelPlane = new THREE.Mesh(geomWheelPlane, matWheelPlane);
	WheelPlane.position.set(15,-25,20);
	WheelPlane.castShadow = true;
	WheelPlane.receiveShadow = true;

	var geomWheelPlane2 = new THREE.BoxGeometry(25,25,5,1,1,1);
	var matWheelPlane2 = new THREE.MeshStandardMaterial({color:Colors.dark, flatShading:true});
	var WheelPlane2 = new THREE.Mesh(geomWheelPlane2, matWheelPlane2);
	WheelPlane2.position.set(15,-25,0);
	WheelPlane2.castShadow = true;
	WheelPlane2.receiveShadow = true;

	// Create the rims
	var geomRimWheel = new THREE.BoxGeometry(15,15,6,1,1,1);
	var matRimWheel = new THREE.MeshStandardMaterial({color:Colors.brownDark, flatShading:true});
	var RimWheel = new THREE.Mesh(geomRimWheel, matRimWheel);
	RimWheel.position.set(0,0,0);
	RimWheel.castShadow = true;
	RimWheel.receiveShadow = true;
	WheelPlane.add(RimWheel);

	this.mesh.add(WheelPlane);
	this.mesh.add(WheelPlane2);
	
	// Create the wing
	var geomSideWing = new THREE.BoxGeometry(40,8,150,1,1,1);
	var matSideWing = new THREE.MeshStandardMaterial({color:Colors.red, flatShading:true});
	var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;
	this.mesh.add(sideWing);
	
	// propeller
	var geomPropeller = new THREE.BoxGeometry(20,10,10,1,1,1);
	var matPropeller = new THREE.MeshPhongMaterial({color:Colors.brown, flatShading:true});
	this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
	this.propeller.castShadow = true;
	this.propeller.receiveShadow = true;
	
	// blades
	var geomBlade = new THREE.BoxGeometry(1,100,20,1,1,1);
	var matBlade = new THREE.MeshPhongMaterial({color:Colors.brownDark, flatShading:true});
	
	var blade = new THREE.Mesh(geomBlade, matBlade);
	blade.position.set(8,0,0);
	blade.castShadow = true;
	blade.receiveShadow = true;
	this.propeller.add(blade);
	this.propeller.position.set(60,0,0);
	this.mesh.add(this.propeller);
};