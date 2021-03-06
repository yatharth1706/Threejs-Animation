var canvas = document.querySelector("#c");

		// creating scene, camera and renderer

		const scene = new THREE.Scene();
		const fov = 45;
		const aspect = 2;
		const near = 0.1;
		const far = 1000;
		const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);

		const renderer = new THREE.WebGLRenderer({canvas});

		camera.position.set(0, 50, 0);
		camera.up.set(0, 0, 1);
		camera.lookAt(0, 0, 0);


		{
		  const color = 0xFFFFFF;
		  const intensity = 3;
		  const light = new THREE.PointLight(color, intensity);
		  scene.add(light);
		}

		// lets add Sun

		const objects = [];

		const solarSystem = new THREE.Object3D();
		scene.add(solarSystem);
		objects.push(solarSystem);

		const earthOrbit = new THREE.Object3D();
		earthOrbit.position.x = 10;
		solarSystem.add(earthOrbit);
		objects.push(earthOrbit);


		const moonOrbit = new THREE.Object3D();
		moonOrbit.position.x = 2;
		earthOrbit.add(moonOrbit);
		objects.push(moonOrbit);

		const radius= 1;
		const widthSegmetns = 10;
		const heightSegments = 10;

		const geometry = new THREE.SphereBufferGeometry(radius, widthSegmetns, heightSegments);
		const material = new THREE.MeshPhongMaterial({color: 0xFFFF00,emissive: 0xFFFF00});
		const Sunmesh = new THREE.Mesh(geometry,material);
		Sunmesh.scale.set(5,5,5);
		solarSystem.add(Sunmesh);
		objects.push(Sunmesh);


		// lets add earth

		const EarthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});

		const EarthMesh = new THREE.Mesh(geometry, EarthMaterial);
		objects.push(EarthMesh)
		earthOrbit.add(EarthMesh);


		const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
		const moonMesh = new THREE.Mesh(geometry, moonMaterial);
		moonMesh.scale.set(.5, .5, .5);
		moonOrbit.add(moonMesh);
		objects.push(moonMesh);
		// lets render our scene

		// remaining task to update canvas heigth and width in request animation frame lets do it

		objects.forEach((node) => {
		  const axes = new THREE.AxesHelper();
		  axes.material.depthTest = false;
		  axes.renderOrder = 1;
		  node.add(axes);
		});

		
		function needResize(){
			
			const canvas = renderer.domElement;
			const height = canvas.clientHeight;
			const width = canvas.clientWidth;
			const needResize = (canvas.width !== width) || (canvas.height !== height);

			if(needResize){
				renderer.setSize(width,height,false);
			}
			return needResize;
		}

		function render(time){
			time *= 0.001


			if(needResize()){
				const canvas = renderer.domElement;
				camera.aspect = canvas.clientWidth/canvas.clientHeight;

				camera.updateProjectionMatrix();
			}
			objects.forEach((obj) => {
				obj.rotation.y = time;
			})
			renderer.render(scene,camera);
			requestAnimationFrame(render);
		}

		requestAnimationFrame(render);