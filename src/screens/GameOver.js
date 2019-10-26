import { Text } from 'pixi.js';
import Screen from './Screen';

class GameOver extends Screen {
	constructor() {
		super();

		this.name = 'game-over';
	}

	init() {
		super.init();

		this.scoreText = new Text('GAME OVER\nFINAL SCORE:', { fill: 0xFFFFFF, align: 'center' });
		this.addChild(this.scoreText);

		['RESTART', 'MAIN MENU'].forEach(this.addButton, this);
		this.attachButtonListeners();
	}

	show(score) {
		this.scoreText.text = `GAME OVER\nFINAL SCORE: ${score}`;
		this.scoreText.width = this.buttons[0].width;

		super.show();
	}
}

export default GameOver;
