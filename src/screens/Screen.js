import { Container } from 'pixi.js';
import Button from './Button';
import { setPivotInCenter } from '../utils';

class Screen extends Container {
	constructor() {
		super();

		this.init();
	}

	init() {
		this.buttons = [];

		this.hide();
	}

	addButton(label) {
		const button = new Button(label, 200, 75);

		const lastChild = this.children[this.children.length - 1] || { y: 0, height: 0 };
		button.y = lastChild.y + lastChild.height;

		this.buttons.push(button);
		this.addChild(button);
		setPivotInCenter(this);

		return button;
	}

	attachButtonListeners() {
		this.buttons.forEach(button => {
			button.on('CLICK', () => {
				const event = button.label.replace(' ', '_');

				this.hide();
				this.emit(event);
			});
		});
	}

	show() {
		this.visible = true;

		this.emit('SHOW');
	}

	hide() {
		this.visible = false;

		this.emit('HIDE');
	}
}

export default Screen;
