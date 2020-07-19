import './style.css';
import { h, render, Component } from 'preact';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>I am a react Component</h1>
			</div>
		);
	}
}

const element = <App />
render(element, document.getElementById('react'));
