var startTime	= Date.now();
var camera, controls, scene, renderer;
var spheres;
var pos, led;
var multiplier_1;
var multiplier_2;
var multiplier_3;
var current_time;
var movement_stats;
var sphere_data = {};
var static_arr = new Array(10);
var static_arr_2 = new Array(10);
var remote_init = false;

var module = {
  "exports":{},
};

for(var i=0;i<10;i++){
  static_arr[i] = new Array(i);
  static_arr_2[i] = new Array(i);
}

// dimension in mm
sphere_data.radiusSphere = 65;
sphere_data.spacingSphere = 230;
sphere_data.maxtravelSphere = 2450;

var sphereData = { w: 10, h: 10, t: current_time, pos: pos, led:led, static_arr:static_arr, static_arr_2: static_arr_2, remote_init: remote_init };


init();
animate();

function addDatGui(){
  var gui = new dat.GUI();
  gui.autoListen = true;

  movement_stats =
  {
    height_max: 0.01,
    height_min: 10.01,
    linear_max: 0.01,
    linear_min: 0.01
  }

  gui.add(camera.position, 'x', -5000,5000).step(5);
  gui.add(camera.position, 'y', -5000,5000).step(5);
  gui.add(camera.position, 'z', 0,10000).step(5);
  gui.add(movement_stats,'linear_max').listen();
  gui.add(movement_stats,'linear_min').listen();
  gui.add(movement_stats,'height_max').listen();
  gui.add(movement_stats,'height_min').listen();


}

function initSphereWorld(){

  var radius = sphere_data.radiusSphere;
  var spacing = sphere_data.spacingSphere;

  spheres = new Array(10);
  brightness = new Array(10);
  sphere_data.position = new Array(10);
  sphere_data.old_position = new Array(10);
  sphere_data.velocity = new Array(10);

  pos = new Array(10);
  led = new Array(10);

  for(var i=0;i<10;i++){

    spheres[i] = new Array(i);
    brightness[i] = new Array(i);
    pos[i] = new Array(i);
    led[i] = new Array(i);
    sphere_data.position[i] = new Array(i);
    sphere_data.old_position[i] = new Array(i);
    sphere_data.velocity[i] = new Array(i);

  }

  var colorMat = new THREE.Color();
  colorMat.setHSL(64/360,86/100,1);
  var sphereMaterial = new THREE.MeshBasicMaterial({color:colorMat});

  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){

      spheres[i][j] = new THREE.Mesh(new THREE.SphereGeometry(radius, radius, radius), sphereMaterial);
      brightness[i][j] = 0;
      spheres[i][j].overdraw = true;
      spheres[i][j].position = new THREE.Vector3((i-4)*(spacing + radius*2), (j-4)*(spacing + radius*2), 1000);
      scene.add(spheres[i][j]);

    }
  }

}

function init(){

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.x = 0;
  camera.position.y = -5000;
  camera.position.z = 5000;

  //scene
  scene = new THREE.Scene();

  //renderer
  if ( Detector.webgl )
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  else
  renderer = new THREE.CanvasRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColorHex( 0xffffff, 1 );

  container = document.getElementById('ThreeJS');
  container.appendChild(renderer.domElement);

  //controls = new THREE.OrbitControls( camera );//, renderer.domElement );
  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.addEventListener( 'change', render );

  initSphereWorld();

  var ambientLight = new THREE.AmbientLight(0xFFFF66);
  scene.add(ambientLight);

  addDatGui();

  noise.seed(Math.random());

}

function animate(){


  setTimeout( function() {
    requestAnimationFrame( animate );
  }, 1000 / 60 );

  render();

  controls.update();

}

function render() {

  sphere_data.timestamp = current_time;

  sphereData.t = current_time;
  sphereData.pos = pos;
  sphereData.led = led;

  if(!module || !module.exports || !module.exports.setPosAndLED){
    console.log("Animation not loaded yet.");
    return;
  }
  module.exports.setPosAndLED(sphereData);

  for( var x = 0; x < sphereData.w; x++ ){
    for( var y=0; y < sphereData.h; y++ ){

      sphere_data.old_position[x][y] = spheres[x][y].position.z;
      spheres[x][y].position.z = sphere_data.maxtravelSphere * sphereData.pos[x][y];
      sphere_data.position[x][y] = spheres[x][y].position.z;

      current_time = Date.now() - startTime;
      var time_diff = Math.abs(current_time - sphere_data.timestamp);

      sphere_data.velocity[x][y] = Math.abs( 0.0393701*(sphere_data.position[x][y] - sphere_data.old_position[x][y]))/(1/60);

      brightness[x][y] = sphereData.led[x][y];

      var colorMat = new THREE.Color();
      colorMat.setHSL(64/360,86/100,0.5 * brightness[x][y] + 0.2);
      spheres[x][y].material = new THREE.MeshBasicMaterial({color:colorMat});

      if ( (sphere_data.velocity[x][y] > movement_stats.linear_max) && (current_time>5000)) {movement_stats.linear_max = sphere_data.velocity[x][y];
      }

      if ( (sphereData.pos[x][y] > movement_stats.height_max) && (current_time>5000)) {
        movement_stats.height_max = sphereData.pos[x][y];
      }


      if ( (sphereData.pos[x][y] < movement_stats.height_min) && (current_time>5000)) {
        movement_stats.height_min = sphereData.pos[x][y];
      }

    }
  }

  renderer.render( scene, camera );

}
