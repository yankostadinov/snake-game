import App from './App';

function createApp() {
	const app = new App();
	const element = document.createElement('div');

	element.id = app.name;

	return app.view;
}

document.body.appendChild(createApp());
