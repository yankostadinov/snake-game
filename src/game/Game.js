import { Ticker, Container, filters } from 'pixi.js';
import config from '../config';
import Grid from './Grid';
import FoodNode from './FoodNode';
import Snake from './Snake';
import { getDeltaFromDirection } from '../utils.js';

let ticksSinceMove = 0;

class Game extends Container {
	constructor() {
		super();

		this.name = 'game';

		this.onTick = this.onTick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);

		this.init();
	}

	init() {
		this.grid = new Grid();

		this.snake = new Snake();
		this.addChild(this.snake);

		this.initSnakePos();
		this._setSnakeOnGrid();

		Ticker.shared.add(this.onTick);
		window.addEventListener('keydown', this.onKeyDown);

		this._addFood();
	}

	initSnakePos() {
		const centerGridRow = this.grid.height / 2 - 1;
		const centerGridCol = this.grid.width / 2 - 1;

		this.snake.bodyParts.forEach((snakePart, partIndex) => {
			const partPos = this.grid.gridToPosition(centerGridRow + partIndex, centerGridCol);
			snakePart.setPosition(partPos);
		});
	}

	onKeyDown(event) {
		const validKeys = Object.keys(config.keyMap);
		const keyCode = event.code;

		if (!validKeys.includes(keyCode)) return;

		this.setDirection(config.keyMap[keyCode]);
	}

	onTick() {
		const shouldMove = ++ticksSinceMove === config.snake.ticksPerMove;
		if (!shouldMove) return;

		ticksSinceMove = 0;
		this.move();
	}

	setDirection(direction) {
		const { dx, dy } = getDeltaFromDirection(direction);

		const goingOppositeDirection = dx === -this.snake.dx && dy === -this.snake.dy;
		const goingSameDirection = dx === this.snake.dx && dy === this.snake.dy;

		if (goingOppositeDirection || goingSameDirection) return;

		this.snake.dx = dx;
		this.snake.dy = dy;

		ticksSinceMove = 0;
		this.move();
	}

	move() {
		const { row, col, type } = this.grid.positionToGrid(this.snake.head.x, this.snake.head.y, this.snake.dx, this.snake.dy);
		let willEat = type === 'food';

		if (type === 'snake') return this.end();

		this._clearSnakeFromGrid();

		if (willEat) this.snake.eat();
		else this.snake.move();

		this.snake.head.setPosition(this.grid.gridToPosition(row, col));
		this.snake.orientHead();

		this._setSnakeOnGrid();

		if (willEat) this._updateFood();
	}

	end() {
		Ticker.shared.remove(this.onTick);
		window.removeEventListener('keydown', this.onKeyDown);

		this._applyFilter();

		const score = this.score;

		this.snake.once('DEAD', () => this.emit('GAME_OVER', score));
		this.snake.die();
	}

	get score() {
		const timesEaten = this.snake.body.length - config.snake.initialBodySize;
		const pureScore = timesEaten * config.highscores.scoreMultiplier;

		return Math.round(pureScore / config.snake.ticksPerMove);
	}

	_clearSnakeFromGrid() {
		this._updateGridSnake('empty');
	}

	_setSnakeOnGrid() {
		this._updateGridSnake('snake');
	}

	_updateGridSnake(type) {
		const positions = this.snake.bodyParts.map(bodyPart => {
			return this.grid.positionToGrid(bodyPart.x, bodyPart.y);
		});

		this.grid.setType(type, positions);
	}

	_updateFood() {
		const food = this.children.find(child => child.type === 'food');
		const foodPos = this.grid.positionToGrid(food.x, food.y);

		this.removeChild(food);
		this.grid.setType('empty', foodPos);

		this._addFood();
	}

	_addFood() {
		const food = new FoodNode();
		const { row, col } = this.grid.getRandomEmpty();

		this.grid.setType('food', { row, col });

		food.setPosition(this.grid.gridToPosition(row, col));
		this.addChild(food);
	}

	_applyFilter() {
		const colorMatrix = new filters.ColorMatrixFilter();
		colorMatrix.negative();
		this.filters = [colorMatrix];
	}
}

export default Game;
