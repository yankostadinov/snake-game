export default {
	grid: {
		height: 30,
		width: 30,
		cellSize: 16,
	},
	snake: {
		initialBodySize: 5,
		ticksPerMove: 3, // move once very {ticksPerMove} ticks
		dyingPartDelay: 100, // delay (in ms) between parts dying when game is over
	},
	highscores: {
		scoresToKeep: 10,
		scoreMultiplier: 100,
	},
	keyMap: {
		'ArrowUp': 'up',
		'ArrowRight': 'right',
		'ArrowDown': 'down',
		'ArrowLeft': 'left',
	},
	food: ['apple', 'cherry']
};
