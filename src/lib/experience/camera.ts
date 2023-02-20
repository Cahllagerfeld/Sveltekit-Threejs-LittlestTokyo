import Experience from "./experience";
import type Sizes from "./sizes";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
	experience: Experience;
	sizes: Sizes;
	scene: THREE.Scene;
	canvas: HTMLCanvasElement;
	perspectiveCamera: THREE.PerspectiveCamera;
	orthographicCamera: THREE.OrthographicCamera;
	frustrum: number;
	controls: OrbitControls;
	camera: Camera;
	renderer: import("/workspace/Sveltekit-Threejs-LittlestTokyo/src/lib/experience/renderer").default;

	constructor(canvas: HTMLCanvasElement) {
		this.experience = new Experience(canvas);
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();
		this.setOrbitControls();
	}

	public setOrbitControls() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.1;
	}

	private createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 10000);

		this.perspectiveCamera.position.set(10, 10, 10);
		this.scene.add(this.perspectiveCamera);
	}

	private createOrthographicCamera() {
		this.frustrum = 5;
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.frustrum) / 2,
			(this.sizes.aspect * this.frustrum) / 2,
			this.frustrum / 2,
			-this.frustrum / 2,
			-100,
			100
		);

		this.scene.add(this.orthographicCamera);
	}

	public resize() {
		this.perspectiveCamera.aspect = this.sizes.aspect;
		this.perspectiveCamera.updateProjectionMatrix();
	}
}
