import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { EventEmitter } from "events";
import type { Asset } from "./assets";
import Experience from "./experience";
import type Renderer from "./renderer";
import type { Scene } from "three";

export default class Resources extends EventEmitter {
  experience: Experience;
  renderer: Renderer;
  assets: Asset[];
  items: { [key: string]: GLTF };
  queue: number;
  loaded: number;
  loaders: { gltfLoader: GLTFLoader; dracoLoader: DRACOLoader };
  scene: Scene;
  constructor(canvas: HTMLCanvasElement, assets: Asset[]) {
    super();
    this.experience = new Experience(canvas);
    this.renderer = this.experience.renderer;
    this.scene = this.experience.scene;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }
  startLoading() {
    for (const asset of this.assets) {
      this.loaders.gltfLoader.load(asset.path, (file) => {
        this.singleAssetLoaded(asset, file);
      });
    }
  }
  setLoaders() {
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  singleAssetLoaded(asset: Asset, file: GLTF) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
