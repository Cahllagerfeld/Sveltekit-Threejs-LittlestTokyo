import Experience from "./experience";
import type { Scene } from "three";
import type Resources from "./resources";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export default class Model {
  experience: Experience;
  scene: Scene;
  resources: Resources;
  tokyo: GLTF;
  constructor(canvas: HTMLCanvasElement) {
    this.experience = new Experience(canvas);
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.tokyo = this.resources.items.LittelestTokyo;
      this.tokyo.scene.position.set(1, 1, 0);
      this.tokyo.scene.scale.set(0.01, 0.01, 0.01);
      this.setModel();
    });

    // this.setModel();
  }
  setModel() {
    this.scene.add(this.tokyo.scene);
  }
}
