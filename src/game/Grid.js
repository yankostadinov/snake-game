import { range, shuffle } from 'lodash/fp';
import config from '../config';

class Grid {
	constructor() {
		this.width = config.grid.width;
		this.height = config.grid.height;

		const blankRows = Array(this.height).fill();
		this.rows = blankRows.map(() => Array(this.width).fill('empty'));
	}

	positionToGrid(x, y, dx = 0, dy = 0) {
		let row = Math.floor(y / config.grid.cellSize) + dy;
		let col = Math.floor(x / config.grid.cellSize) + dx;

		let rowAdjustment = this.height;
		let colAdjustment = this.width;

		if (row >= rowAdjustment) rowAdjustment *= -1;
		else if (row >= 0) rowAdjustment *= 0;

		if (col >= colAdjustment) colAdjustment *= -1;
		else if (col >= 0) colAdjustment *= 0;

		row += rowAdjustment;
		col += colAdjustment;

		const type = this.rows[row][col];

		return { row, col, type };
	}

	getRandomEmpty() {
		let row, col;

		const shuffledRows = shuffle(range(0, this.height));
		const shuffledCols = shuffle(range(0, this.width));

		shuffledRows.some(rowIndex => {
			const emptyGridCol = shuffledCols.find(colIndex => this.rows[rowIndex][colIndex] === 'empty');
			const hasEmptyPos = emptyGridCol !== undefined;

			if (hasEmptyPos) [row, col] = [rowIndex, emptyGridCol];

			return hasEmptyPos;
		});

		return { row, col };
	}

	gridToPosition(row, col) {
		const x = col * config.grid.cellSize;
		const y = row * config.grid.cellSize;

		return { x, y };
	}

	setType(type, position) {
		let positionsToSet = [].concat(position); // to handle both a single position and an array

		positionsToSet.forEach(({ row, col }) => {
			this.rows[row][col] = type;
		});
	}
}

export default Grid;
