import { Loader } from 'pixi.js';

const ASSETS = {};

class AssetLoader extends Loader {
	start(onLoadComplete) {
		this
			.add('assets.json')
			.load(() => {
				Object.assign(ASSETS, this.resources['assets.json'].textures);
				onLoadComplete();
			});
	}

	static get textures() {
		return ASSETS;
	}
}

export default AssetLoader;
