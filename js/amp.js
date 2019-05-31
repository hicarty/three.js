var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 100;

// Instantiate a loader
var loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load( 'models/dsl20c.gltf', function ( gltf ) {

        scene = gltf.scene;
        //var mesh = scene.children[ 3 ];

		scene.add( gltf.scene );

		//gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene = scene;
		//gltf.scenes; // Array<THREE.Scene>
		gltf.cameras = camera; // Array<THREE.Camera>
		gltf.asset = 'models/dsl20c.gltf'; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

loader.setPath( 'models/dsl20c.gltf');
