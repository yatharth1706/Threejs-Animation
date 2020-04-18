var canvas = document.getElementById("c");

// create a scene, camera and renderer

const scene = new THREE.Scene();
const fov = 45
const aspect = 2
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

const renderer = new THREE.WebGLRenderer({canvas});

// now we will create a rotating box which 
// need three things geometry, material and mesh to combine

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({color: 0xFFFF00 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube);
// set the position of camera
camera.position.set(0,0,10);
camera.lookAt(0,0,0);

// but the resolution is not good for that we will do some stuff

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
    time *= 0.001;

    if(needResize()){
        const canvas = renderer.domElement;
        // update camera aspect
        camera.aspect = canvas.clientWidth/canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    cube.rotation.x = time;
    cube.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);