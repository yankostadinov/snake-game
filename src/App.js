import { Application } from 'pixi.js';
import config from './config';
import AssetLoader from './AssetLoader';
import Game from './game/Game';
import GameOver from './screens/GameOver';
import Highscores from './screens/Highscores';
import Menu from './screens/Menu';
import { positionAtCenterOf } from './utils';

class App extends Application {
	constructor() {
		super({
			width: config.grid.width * config.grid.cellSize,
			height: config.grid.height * config.grid.cellSize,
			sharedTicker: true
		});

		this.name = 'snake-app';

		this.init();
	}

	init() {
		this.menu = new Menu();
		this.highscores = new Highscores();
		this.gameOverScreen = new GameOver();

		this.screens.forEach(screen => positionAtCenterOf(screen, this.view));
		this.stage.addChild(...this.screens);

		this._attachScreenListeners();

		this.loader = new AssetLoader();
		this.loader.start(() => this.menu.show());
	}

	newGame() {
		this.game = new Game();
		this.stage.addChild(this.game);

		this.game.once('GAME_OVER', event => this.gameOver(event));
	}

	gameOver(score) {
		this.highscores.add(score);
		this.gameOverScreen.show(score);
		this.game.destroy();
	}

	get screens() {
		return [this.menu, this.highscores, this.gameOverScreen];
	}

	_attachScreenListeners() {
		this.menu.on('NEW_GAME', this.newGame, this);
		this.gameOverScreen.on('RESTART', this.newGame, this);
		this.menu.on('HIGHSCORES', () => this.highscores.show());
		this.highscores.on('HIDE', () => this.menu.show());
		this.gameOverScreen.on('MAIN_MENU', () => this.menu.show());
	}
}

export default App;
