import { Sprite } from 'pixi.js';
import config from '../config';
import { getRotationFromDirection } from '../utils.js';

class SpriteNode extends Sprite {
	constructor(texture) {
		super(texture);

		this.pivot.set(config.grid.cellSize / 2);
	}

	setPosition({ x, y }) {
		this.position.set(x + this.pivot.x, y + this.pivot.y);
	}

	setOrientation(direction) {
		const degrees = getRotationFromDirection(direction);

		this.rotation = degrees * Math.PI / 180;
	}
}

export default SpriteNode;
