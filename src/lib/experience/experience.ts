import * as THREE from "three";
import Sizes from "./sizes";
import Camera from "./camera";
import Renderer from "./renderer";
import Resources from "./resources";

import { assets } from "./assets";

export default class Experience {
  static instance: Experience;
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  sizes: Sizes;
  camera: Camera;
  renderer: Renderer;
  resources: Resources;

  constructor(canvas: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera(this.canvas);
    this.renderer = new Renderer(this.canvas);
    this.resources = new Resources(this.canvas, assets);
  }
}
