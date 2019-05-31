var Site = Site || {};
Site.Module = Site.Module || {};

(function (namespace){
    // SETUP
    var scene;
    var camera;
    var renderer;

    (function Main() {
        initScene();
        renderScene();
    })();

    function initScene() {
        canvasWidth = window.innerWidth; 
        canvasHeight = window.innerHeight;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );
        //(FOV [deg], aspect ratio, near clipping plane/render distance, far clipping plane/render distance)

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize( canvasWidth, canvasHeight ); //.setSize( width/2, height/2, updateStyle = false ) renders at half resolution
        document.body.appendChild( renderer.domElement );

        // CUBE
        var cube;
        (function addCube() {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 ); // vertices, faces
            var neheTexture = new THREE.TextureLoader("/img/transpose_logo@2x.png");
            var materials = [ 
                new THREE.MeshBasicMaterial({color:0x00f600}), 
                new THREE.MeshBasicMaterial({color:0x08F808}), 
                new THREE.MeshBasicMaterial({color:0x0000FF}), 
                new THREE.MeshBasicMaterial({color:0xFFFF00}), 
                new THREE.MeshBasicMaterial({color:0x00FFFF}), 
                new THREE.MeshBasicMaterial({color:0xFFFFFF}) 
            ];
            cube = new THREE.Mesh( geometry, materials ); // applies material to geometry
            scene.add( cube ); //add at co-ordinate(0,0,0)
        })();

        // LINE
        var line;
        (function addLine() {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3( -2, 1, 0) );
            geometry.vertices.push(new THREE.Vector3( 0, 1, 0) );
            geometry.vertices.push(new THREE.Vector3( 1, 0, 0) );

            var material = new THREE.LineBasicMaterial( { color: 0x00f600 } );
            line = new THREE.Line( geometry, material );
            scene.add( line );
        })();

        // TRIANGLE
        var triangle;
        (function addTriangle() {
            var geometry = new THREE.Geometry(); 
            geometry.vertices.push(new THREE.Vector3( 0.0,  1.0, 0.0)); 
            geometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
            geometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
            geometry.faces.push(new THREE.Face3(0, 1, 2)); 
            geometry.faces[0].vertexColors[0] = new THREE.Color(0xb60be9); 
            geometry.faces[0].vertexColors[1] = new THREE.Color(0xee02be); 
            geometry.faces[0].vertexColors[2] = new THREE.Color(0x00f600);

            var material = new THREE.MeshBasicMaterial({ vertexColors:THREE.VertexColors, side:THREE.DoubleSide }); //Vertex Colors
            triangle = new THREE.Mesh(geometry, material); 
            triangle.position.set(-1.5, 0.0, 4.0); 
            scene.add(triangle); 
        })();

        //camera.position.z = 5; // move the camera away from cube
        camera.position.set( 0, 0, 10 );
        camera.lookAt( 0, 0, 0 );

        // RENDER
        function animate() { // call render or animate loop
            requestAnimationFrame( animate ); // like setInterval at monitor refresh rate
            // ANIMATE
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            renderScene();
        }
        animate();

        window.onscroll = (e) => { window.scrollTo(0,0); triangle.rotation.y += 0.1; };
    };
    

    function renderScene() {
        renderer.render( scene, camera );
    }

}( Site.Module || {}));
