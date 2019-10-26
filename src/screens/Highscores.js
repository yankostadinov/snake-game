import { Text } from 'pixi.js';
import config from '../config';
import Screen from './Screen';
import { setPivotInCenter } from '../utils';

class Highscores extends Screen {
	constructor() {
		super();

		this.name = 'highscores';
	}

	init() {
		super.init();

		this.scores = JSON.parse(localStorage.getItem('highscores')) || [];
		this.scoresText = new Text('HIGHSCORES\n\n\n', { fill: 0xFFFFFF, align: 'center' });

		this.addChild(this.scoresText);

		this.backButton = this.addButton('BACK TO MENU');
		this.backButton.on('CLICK', () => this.hide());
	}

	add(score) {
		this.scores.push(score);
		this.scores.sort((a, b) => b - a);
		this.scores.slice(config.highscores.scoresToKeep);

		localStorage.setItem('highscores', JSON.stringify(this.scores));
	}

	show() {
		super.show();

		let joinedScores = this.scores.length === 0 ? 'No scores yet.' : this.scores.join('\n');
		this.scoresText.text = `HIGHSCORES\n${joinedScores}\n\n`;
		this.scoresText.width = this.backButton.width;

		this.backButton.y = this.scoresText.height;

		setPivotInCenter(this);
	}
}

export default Highscores;
