var Site = Site || {};
Site.Module = Site.Module || {};

(function (namespace){
    // SETUP
    var scene;
    var camera;
    var renderer;
    var cube;

    (function Main() {
        initScene();
        renderScene();
        animate();
    })();

    function initScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //(FOV [deg], aspect ratio, near clipping plane/render distance, far clipping plane/render distance)

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight ); //.setSize( width/2, height/2, updateStyle = false ) renders at half resolution
        document.body.appendChild( renderer.domElement );

        // CUBE
        (function addCube() {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // vertices, faces
            var material = new THREE.MeshBasicMaterial( { color: 0x888888 } ); // green material
            cube = new THREE.Mesh( geometry, material ); // applies material to geometry
            scene.add( cube ); //add at co-ordinate(0,0,0)
        })();

        // LINE
        (function addLine() {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( -1, 0, 0) );
            geometry.vertices.push(new THREE.Vector3( 0, 1, 0) );
            geometry.vertices.push(new THREE.Vector3( 1, 0, 0) );

            var material = new THREE.LineBasicMaterial( { color: 0x00f600 } );
            var line = new THREE.Line( geometry, material );
            scene.add( line );
        })();

        //camera.position.z = 5; // move the camera away from cube
        camera.position.set( 0, 0, 10 );
        camera.lookAt( 0, 0, 0 );
    };
    

    function renderScene() {
        renderer.render( scene, camera );
    }


    // RENDER
    function animate() { // call render or animate loop
        requestAnimationFrame( animate ); // like setInterval at monitor refresh rate
        // ANIMATE
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderScene();
    }

}( Site.Module || {}));
