var canvas = document.getElementById("c");

// create a scene, camera and renderer

const scene = new THREE.Scene();
const fov = 45
const aspect = 2
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

const renderer = new THREE.WebGLRenderer({canvas});

// first we will create a plane
const planeSize = 40;

// create one texture to embed on plane
const loader = new THREE.TextureLoader();
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

// now create a plane geometry
const plane = new THREE.PlaneBufferGeometry(planeSize,planeSize);
const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
})

const planeMesh = new THREE.Mesh(plane,material);
planeMesh.rotation.x = Math.PI * -.5;
scene.add(planeMesh);

// lets add cube and sphere
{
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

// lets add lighting in a room
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

// lets add orbit controls
const controls = new THREE.OrbitControls(camera, render.domElement);


// set the position of camera
camera.position.set(0,10,20);
// after every changing of position controls should be updated
controls.target.set(0, 5, 0);
controls.update();
// but the resolution is not good for that we will do some stuff


class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  const gui = new dat.GUI();

gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
gui.add(light, 'intensity', 0, 2, 0.01);

function needResize(){
    const canvas = renderer.domElement;
    const height = canvas.clientHeight;
    const width = canvas.clientWidth;
    const needResize = (canvas.height !== height) || (canvas.width !== width);
    if(needResize){
        renderer.setSize(width, height);
    }
    return needResize;
}

function render(time){
    if (needResize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
}

requestAnimationFrame(render);