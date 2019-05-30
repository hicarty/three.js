var Site = Site || {};

(function (namespace){
    var scene;
    var camera;
    
    initScene();
    renderScene();
    
    // SETUP
    function initScene() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        // camera.position.set( 0, 0, 100 );
        // camera.lookAt( 0, 0, 0 );
        
        var renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    
        // CUBE
        var cube;
        (function addCube() {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // vertices, faces
            var material = new THREE.MeshBasicMaterial( { color: 0x888888 } ); // green material
            cube = new THREE.Mesh( geometry, material ); // applies material to geometry
        });
    
        // LINE
        var line;
        (function addLine() {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
            geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
            geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
            
            var material = new THREE.LineBasicMaterial( { color: 0x00f600 } );
            line = new THREE.Line( geometry, material );
        });
    }
    
    // RENDER
    function renderScene() {
        scene.add( cube ); //add at co-ordinate(0,0,0)
        scene.add( line );
        renderer.render( scene, camera );
    }
    
    // function animate() { // call render or animate loop
    //     requestAnimationFrame( animate ); // like setInterval at monitor refresh rate
    //     // ANIMATE
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
        
    // }
    // animate();
}( Site || {}));
