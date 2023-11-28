import AirPlane from './ressources/plane.js';
import Lava from './ressources/lava.js';
import Sky from './ressources/sky.js';
import Bonus from './ressources/bonus.js';
import Bird from './ressources/bird.js';

window.addEventListener('load', init, false);

// STRUCTURE
function init() {
	createScene();
	createLights();
	createPlane();
	createLava();
	createSky();
	// start a loop that will update the objects' positions 
	// and render the scene on each frame
    document.addEventListener('mousemove', handleMouseMove, false);
	loop();
    renderer.render(scene, camera);
}

document.getElementById('playButton').addEventListener('click', startGame);
var scoreBox = document.getElementById('container');
scoreBox.style.display = 'none';


function startGame() {
    createBonus();
    createMalus();
    // Hide the play button
    document.getElementById('playButton').style.display = 'none';
	scoreBox.style.display = 'block';
}

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

function createScene() {
	// Get the width and the height of the screen,
	// use them to set up the aspect ratio of the camera 
	// and the size of the renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	// Create the scene
	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
	
	// Create the camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
	
	// Set the position of the camera
	camera.position.x = 0;
	camera.position.z = 220;
	camera.position.y = 100;
	
	// Create the renderer
	renderer = new THREE.WebGLRenderer({ 
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true, 

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
		antialias: true 
	});

	// Define the size of the renderer; in this case,
	// it will fill the entire screen
	renderer.setSize(WIDTH, HEIGHT);
	
	// Enable shadow rendering
	renderer.shadowMap.enabled = true;
	
	// Add the DOM element of the renderer to the 
	// container we created in the HTML
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);
	
	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// LIGHTS
var hemisphereLight, shadowLight, ambientLight;

function createLights() {
	// A hemisphere light is a gradient colored light; 
	// the first parameter is the sky color, the second parameter is the ground color, 
	// the third parameter is the intensity of the light
	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 3)
	
	// A directional light shines from a specific direction. 
	// It acts like the sun, that means that all the rays produced are parallel. 
	shadowLight = new THREE.DirectionalLight(0xffffff, 4);

    ambientLight = new THREE.AmbientLight(0xdc8874, .5);

	// Set the direction of the light  
	shadowLight.position.set(150, 350, 350);
	
	// Allow shadow casting 
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better, 
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// to activate the lights, just add them to the scene
	scene.add(hemisphereLight);  
	scene.add(shadowLight);
    scene.add(ambientLight);
}

// Instantiate the lava and add it to the scene:
var lava, sky, airplane;

function createLava(){
	lava = new Lava();

	// push it a little bit at the bottom of the scene
	lava.mesh.position.y = -600;

	// add the mesh of the lava to the scene
	scene.add(lava.mesh);
}

function createSky(){
	sky = new Sky();
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}

function createPlane(){ 
	airplane = new AirPlane();
	airplane.mesh.scale.set(.25,.25,.25);
	airplane.mesh.position.y = 100;
	scene.add(airplane.mesh);
}

// BONUS AND MALUS MANAGEMENT

var bonusArray = []; // Create an array to store all the bonus

function createBonus(){
    for (var i = 0; i < 3; i++) { // Create 3 bonus
        var bonus = new Bonus();
        bonus.mesh.position.y = Math.random() * 150 + 50; // Random y position between 50 and 200
        bonus.mesh.position.x = window.innerWidth / 2 + i * 100; // Spread out the bonus
        scene.add(bonus.mesh);
        bonusArray.push(bonus); // Add the bonus to the array
    }
    animateBonus();
}

function animateBonus() {
    requestAnimationFrame(animateBonus);
    for (var i = 0; i < bonusArray.length; i++) { // Animate each bonus
        var bonus = bonusArray[i];
        bonus.mesh.position.x -= 2; // Move to the left

        // If the bonus is out of the screen on the left side, reset its position to the right side
        if (bonus.mesh.position.x < -window.innerWidth / 2) {
            bonus.mesh.position.x = window.innerWidth / 2;
            bonus.mesh.position.y = Math.random() * 150 + 50; // Random y position between 50 and 200
        }
    }
}

var malusArray = []; // Create an array to store all the malus

function createMalus(){
    for (var i = 0; i < 5; i++) { // Create 5 malus
        var malus = new Bird();
        malus.mesh.position.y = Math.random() * 150 + 50;
        malus.mesh.position.x = window.innerWidth / 2 + i * 100; // Spread out the malus
        scene.add(malus.mesh);
        malusArray.push(malus); // Add the malus to the array
    }
    animateMalus();
}

function animateMalus() {
    requestAnimationFrame(animateMalus);
    for (var i = 0; i < malusArray.length; i++) { // Animate each malus
        var malus = malusArray[i];
        malus.mesh.position.x -= 3;

        if (malus.mesh.position.x < -window.innerWidth / 2) {
            malus.mesh.position.x = window.innerWidth / 2;
            malus.mesh.position.y = Math.random() * 150 + 50;
        }
    }
}

var mousePos={x:0, y:0};

function handleMouseMove(event) {

	// here we are converting the mouse position value received 
	// to a normalized value varying between -1 and 1;
	// this is the formula for the horizontal axis:
	
	var tx = -1 + (event.clientX / WIDTH)*2;

	// for the vertical axis, we need to inverse the formula 
	// because the 2D y-axis goes the opposite direction of the 3D y-axis
	
	var ty = 1 - (event.clientY / HEIGHT)*2;
	mousePos = {x:tx, y:ty};
}

var score = 0;
var isPushedBack = false;

function loop(){
	lava.mesh.rotation.z += .005;
	sky.mesh.rotation.z += .01;

    var airplaneBox = new THREE.Box3().setFromObject(airplane.mesh);

	for (var i = 0; i < bonusArray.length; i++) { // Check each bonus
        var bonusBox = new THREE.Box3().setFromObject(bonusArray[i].mesh);

        if (airplaneBox.intersectsBox(bonusBox)) {
            score++;
            console.log("Score: " + score);
            scoreBox.textContent = "Score: " + score;
            bonusArray[i].mesh.position.x = window.innerWidth / 2; // Reset bonus position
            bonusArray[i].mesh.position.y = Math.random() * 150 + 50; // Random y position between 50 and 200
        }
    }

    for (var i = 0; i < malusArray.length; i++) { // Check each malus
        var malusBox = new THREE.Box3().setFromObject(malusArray[i].mesh);

        if (airplaneBox.intersectsBox(malusBox)) {
            score--;
            console.log("Score: " + score);
            scoreBox.textContent = "Score: " + score;
            malusArray[i].mesh.position.x = window.innerWidth / 2; // Reset malus position
            malusArray[i].mesh.position.y = Math.random() * 150 + 50; // Random y position between 50 and 200

            isPushedBack = true;
        }
    }
	if (isPushedBack) {
		PushBack();
	}
	// update the plane on each frame
	updatePlane();
	
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}

function PushBack() {
    airplane.mesh.position.x -= 1.5; // Decrease the x position
    setTimeout(function() { 
            airplane.mesh.position.x += 1.5; 
            isPushedBack = false;
    }, 300); // Move the plane forward after 1 second
}

function updatePlane(){
	var targetY = normalize(mousePos.y,-.75,.75,25, 175);
	
	// Move the plane at each frame by adding a fraction of the remaining distance
	airplane.mesh.position.y += (targetY-airplane.mesh.position.y)*0.1;

	// Rotate the plane proportionally to the remaining distance
	airplane.mesh.rotation.z = (targetY-airplane.mesh.position.y)*0.0128;
	airplane.mesh.rotation.x = (airplane.mesh.position.y-targetY)*0.0064;

	airplane.propeller.rotation.x += 0.3;
}

function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;
}