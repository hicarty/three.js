var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );	
camera.position.z = 100;


//var div = document.getElementById('WebGLCanvas');

var loader = new THREE.GLTFLoader(); // Instantiate a loader

// Load a glTF resource
loader.load( '/models/dsl20c.gltf', function ( gltf ) {

		scene.add( gltf.scene );

	}, function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, function ( error ) {
		console.log( 'An error happened' );
	}
);

//texture
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;

var texture = new THREE.TextureLoader();

texture.load('/Textures/Elephant Grain Black.jpg', function ( texture ) {
	var material = new THREE.MeshBasicMaterial( { map: texture });
}, undefined, function ( error ) {
	console.error ( error );
});

window.onscroll = (e) => { window.scrollTo(0,0); camera.position.z += 10; console.log(camera.position.z); };
//material
//mesh(GLTF, material)
