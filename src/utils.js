const VALID_DIRECTIONS = ['up', 'down', 'right', 'left'];

export function getRotationFromDirection(direction) {
	if (!VALID_DIRECTIONS.includes(direction)) throw new Error('invalid direction');

	let rotation;

	switch (direction) {
		case 'right':
			rotation = 90;
			break;
		case 'down':
			rotation = 180;
			break;
		case 'left':
			rotation = 270;
			break;
		case 'up':
		default:
			rotation = 0;
			break;
	}

	return rotation;
}

export function getDeltaFromDirection(direction) {
	if (!VALID_DIRECTIONS.includes(direction)) throw new Error('invalid direction');

	let [dx, dy] = [0, 0];

	switch (direction) {
		case 'right':
			dx = 1;
			break;
		case 'down':
			dy = 1;
			break;
		case 'left':
			dx = -1;
			break;
		case 'up':
		default:
			dy = -1;
			break;
	}

	return { dx, dy };
}

export function setPivotInCenter(displayObject) {
	displayObject.pivot.x = displayObject.width / 2;
	displayObject.pivot.y = displayObject.height / 2;
}

export function positionAtCenterOf(displayObject, objectToCenterIn) {
	const { width, height } = objectToCenterIn;
	const [centerX, centerY] = [width / 2, height / 2];

	displayObject.position.set(centerX, centerY);
}
