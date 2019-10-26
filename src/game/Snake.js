import { Container } from 'pixi.js';
import config from '../config';
import AssetLoader from '../AssetLoader';
import SpriteNode from './SpriteNode';

class Snake extends Container {
	constructor() {
		super();

		this.name = 'snake';

		this.textures = {
			head: AssetLoader.textures['head.png'],
			tail: AssetLoader.textures['tail.png'],
			body: AssetLoader.textures['body.png']
		};

		this.init();
	}

	init() {
		this.dx = 0;
		this.dy = -1;

		this.head = new SpriteNode(this.textures.head);
		this.body = Array(config.snake.initialBodySize).fill().map(() => new SpriteNode(this.textures.body));
		this.tail = new SpriteNode(this.textures.tail);

		this.addChild(this.head, ...this.body, this.tail);
	}

	move() {
		const partsToUpdate = this.bodyParts.reverse();

		partsToUpdate.forEach((part, partIndex) => {
			const nextPart = partsToUpdate[partIndex + 1];

			if (nextPart) part.position.set(nextPart.position.x, nextPart.position.y);
		});

		this.orientTail();
	}

	eat() {
		const newPart = new SpriteNode(this.textures.body);

		newPart.position.set(this.head.position.x, this.head.position.y);
		this.body.unshift(newPart);
		this.addChild(newPart);
	}

	die() {
		const dyingParts = this.bodyParts.reverse();

		dyingParts.forEach((dyingPart, partIndex) => {
			const delay = partIndex * config.snake.dyingPartDelay;

			setTimeout(() => {
				dyingPart.destroy();
				if (dyingPart === this.head) this.emit('DEAD');
			}, delay);
		});
	}

	orientHead() {
		this._orientNode(this.head, this.body[0]);
	}

	orientTail() {
		this._orientNode(this.tail, this.body[this.body.length - 1], true);
	}

	get bodyParts() {
		return [this.head, ...this.body, this.tail];
	}

	_orientNode(node, relativeNode, invert) {
		let orientation;
		const [mainNode, secondaryNode] = invert ? [relativeNode, node] : [node, relativeNode];

		if (mainNode.y < secondaryNode.y) orientation = 'up';
		else if (mainNode.x > secondaryNode.x) orientation = 'right';
		else if (mainNode.y > secondaryNode.y) orientation = 'down';
		else orientation = 'left';

		node.setOrientation(orientation);
	}
}

export default Snake;
