import Screen from './Screen';

class Menu extends Screen {
	constructor() {
		super();

		this.name = 'menu';
	}

	init() {
		super.init();

		['NEW GAME', 'HIGHSCORES'].forEach(this.addButton, this);

		this.attachButtonListeners();
	}
}

export default Menu;
