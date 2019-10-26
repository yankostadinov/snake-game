import { Container, Graphics, Text } from 'pixi.js';
import { setPivotInCenter, positionAtCenterOf } from '../utils';

class Button extends Container {
	constructor(text, width, height) {
		super();

		this.interactive = true;
		this.buttonMode = true;

		this.drawBody(width, height);
		this.addLabel(text);

		this.on('mousedown', () => this.onClick());
	}

	drawBody(width, height) {
		const graphics = new Graphics();

		graphics.beginFill(0xAA4F08);
		graphics.lineStyle(2, 0x004F08);
		graphics.drawRect(0, 0, width, height);
		graphics.endFill();

		this.body = graphics;

		this.addChild(graphics);
	}

	addLabel(text) {
		this.label = text;
		this.text = new Text(text, { fill: 0x000000 });

		setPivotInCenter(this.text);
		positionAtCenterOf(this.text, this.body);

		this.addChild(this.text);
	}

	onClick() {
		this.emit('CLICK');
	}
}

export default Button;
