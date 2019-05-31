function Main() {
	const canvas = document.querySelector('#WebGLCanvas');
	var renderer = new THREE.WebGLRenderer({canvas});

	const fov = 75;
	const aspect = window.innerWidth/window.innerHeight;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	camera.position.z = 40;

	const scene = new THREE.Scene();
	scene.background = new THREE.Color('black');

	//TEXTURE
	{
		var loader = new THREE.TextureLoader();

		var texture = loader.load('/Textures/Elephant Grain Black.jpg', function ( texture ) {
			var material = new THREE.MeshBasicMaterial( { map: texture });
		}, undefined, function ( error ) {
			console.error ( error );
		});

		texture.repeat.set(20, 20);

		const geometry = new THREE.PlaneBufferGeometry(40, 40);
		const material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide,});
		const mesh = new THREE.Mesh(geometry, material);

		scene.add(mesh);
	}

	//LIGHT
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 5, 4);
		scene.add(light);
	}

	//var div = document.getElementById('WebGLCanvas');

	var loader = new THREE.GLTFLoader(); // Instantiate a loader

	// Load a glTF resource
	loader.load( '/models/dsl20c.gltf', function ( gltf ) {
			const root = gltf.scene;

			scene.add( root );

		}, function ( xhr ) { // called while loading is progressing
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		}, function ( error ) {
			console.log( 'An error happened' );
		}
	);

	//texture
	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;

	//material
	//mesh(GLTF, material)
	renderer.setSize( window.innerWidth, window.innerHeight );

	function render(time) {
		time *= 0.001;

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
Main();
