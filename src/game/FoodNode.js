import config from '../config';
import { sample } from 'lodash/fp';
import AssetLoader from '../AssetLoader';
import SpriteNode from './SpriteNode';


class FoodNode extends SpriteNode {
	constructor() {
		const texture = AssetLoader.textures[`${sample(config.food)}.png`];

		super(texture);

		this.name = this.type = 'food';
	}
}

export default FoodNode;
