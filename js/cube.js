// SETUP
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//(FOV [deg], aspect ratio, near clipping plane/render distance, far clipping plane/render distance)
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); //.setSize( width/2, height/2, updateStyle = false ) renders at half resolution
document.body.appendChild( renderer.domElement );

// CUBE
var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // vertices, faces
var material = new THREE.MeshBasicMaterial( { color: 0x888888 } ); // green material
var cube = new THREE.Mesh( geometry, material ); // applies material to geometry
scene.add( cube ); //add at co-ordinate(0,0,0)

camera.position.z = 5; // move the camera away from cube

// RENDER
function animate() { // call render or animate loop
    requestAnimationFrame( animate ); // like setInterval at monitor refresh rate
    // ANIMATE
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
