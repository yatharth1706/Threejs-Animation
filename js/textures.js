var canvas = document.querySelector("#c");

		// Now we will create our virtual world
		const scene = new THREE.Scene();
		const fov = 45;
		const aspect = 2;
		const near = 0.1;
		const far = 1000;
		const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
		const renderer = new THREE.WebGLRenderer({canvas});
		camera.position.set(0,0,10);
		camera.lookAt(0,0,0);
		// Create textureloader
		const loader = new THREE.TextureLoader();
		// Now we will create a box to have our texture onto it
		const boxGeometry = new THREE.BoxBufferGeometry(2,2,2);
		

		const materials = [
			new THREE.MeshBasicMaterial({map: loader.load('../images/back.jpg')}),
			new THREE.MeshBasicMaterial({map: loader.load('../images/blueflame.png')}),
			new THREE.MeshBasicMaterial({map: loader.load('../images/dog.jpg')}),
			new THREE.MeshBasicMaterial({map: loader.load('../images/rider2.jpg')}),
			new THREE.MeshBasicMaterial({map: loader.load('../images/dragon.jfif')}),
			new THREE.MeshBasicMaterial({map: loader.load('../images/soldier.jpg')})
		];

		const box = new THREE.Mesh(boxGeometry, materials);
		scene.add(box);

		// create resize function
		function needResize(){
			const canvas = renderer.domElement;
			const height = canvas.clientHeight;
			const width = canvas.clientWidth;
			const needResize = (canvas.width !== width) || (canvas.height !== height);

			if(needResize){
				renderer.setSize(width, height,false);
			}
			return needResize;
		}
		// lets create our render function
	
		function render(time){
			time *= 0.001;

			if(needResize()){
				const canvas = renderer.domElement;
				camera.aspect = canvas.clientWidth/canvas.clientHeight;
				camera.updateProjectionMatrix();
			}

			box.rotation.x = time;
			box.rotation.y = time;
			renderer.render(scene, camera);
			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);