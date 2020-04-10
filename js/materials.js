var canvas = document.querySelector("#c");
		// creating scene,camera and renderer
		const scene = new THREE.Scene();
		const fov = 45;
		const aspect = 2;
		const near = 0.1;
		const far = 1000;
		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

		const renderer = new THREE.WebGLRenderer({canvas});

		// now lets create a small geometry
		const sphere = new THREE.SphereGeometry(3,30,30);
		const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF, emissive: 0xFFFF00, flatShading: true});
		sphereMaterial.needsUpdate = true;
		const mesh = new THREE.Mesh(sphere, sphereMaterial);

		scene.add(mesh);
		mesh.position.set(10,0,0);
		camera.position.set(0,0,100);
		camera.lookAt(0,0,0);

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

		// animation function
		function render(time){
			time *= 0.001;

			if(needResize()){
				const canvas = renderer.domElement;
				// update camera aspect
				camera.aspect = canvas.clientWidth/canvas.clientHeight;
				camera.updateProjectionMatrix();
			}

			renderer.render(scene, camera);
			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);