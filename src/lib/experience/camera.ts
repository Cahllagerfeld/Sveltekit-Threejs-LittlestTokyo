import Experience from "./experience";
import type Sizes from "./sizes";
import * as THREE from "three";

export default class Camera {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  perspectiveCamera: THREE.PerspectiveCamera;
  orthographicCamera: THREE.OrthographicCamera;
  frustrum: number;

  constructor(canvas: HTMLCanvasElement) {
    this.experience = new Experience(canvas);
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }

  private createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

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
