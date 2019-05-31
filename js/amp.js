function Main() {
	const canvas = document.querySelector('#WebGLCanvas');
	var renderer = new THREE.WebGLRenderer({canvas});

	const fov = 75;
	const aspect = window.innerWidth/window.innerHeight;
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 100;

	const controls = new THREE.OrbitControls(camera, canvas);
  	controls.target.set(0, 5, 0);
  	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color('black');

	/*//TEXTURE
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
	*/

	//LIGHT
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 5, 4);
		scene.add(light);
	}

	//var div = document.getElementById('WebGLCanvas');

	//OBJECT
	{
		var loader = new THREE.GLTFLoader(); // Instantiate a loader

		// Load a glTF resource
		loader.load( '/models/dsl20c.gltf', function ( gltf ) {
			const root = gltf.scene;
			scene.add( root );

			controlOrbit();

		}, function ( xhr ) { // called while loading is progressing
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		}, function ( error ) {
			console.log( 'An error happened' );
		});
	}

	function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
		const halfFovY = THREE.Math.degToRad(camera.fov * .5);
		const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
		// compute a unit vector that points in the direction the camera is now
		// in the xz plane from the center of the box
		const direction = (new THREE.Vector3())
			.subVectors(camera.position, boxCenter)
			.multiply(new THREE.Vector3(1, 0, 1))
			.normalize();
	
		// move the camera to a position distance units way from the center
		// in whatever direction the camera was from the center already
		camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
	
		// pick some near and far values for the frustum that
		// will contain the box.
		camera.near = boxSize / 100;
		camera.far = boxSize * 100;
	
		camera.updateProjectionMatrix();
	
		// point the camera to look at the center of the box
		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
	}

	function controlOrbit() {
		// compute the box that contains all the stuff
		// from root and below
		const box = new THREE.Box3().setFromObject(root);
		const boxSize = box.getSize(new THREE.Vector3()).length();
		const boxCenter = box.getCenter(new THREE.Vector3());
		// set the camera to frame the box
		frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
		// update the Trackball controls to handle the new size
		controls.maxDistance = boxSize * 10;
		controls.target.copy(boxCenter);
		controls.update();
	}

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
