import * as THREE from "three";
import Sizes from "./sizes";
import Camera from "./camera";
import Renderer from "./renderer";
import Resources from "./resources";
import World from "./world";

import { assets } from "./assets";
import Model from "./model";

export default class Experience {
	static instance: Experience;
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	sizes: Sizes;
	camera: Camera;
	renderer: Renderer;
	resources: Resources;
	world: World;
	model: Model;

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

		this.model = new Model(this.canvas);
		this.world = new World(this.canvas);

		this.resources.on("ready", () => {
			this.renderer.update();
		});
	}
}
