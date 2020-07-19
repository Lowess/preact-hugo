import './css/main.scss';
import preactIcon from './img/preact.png';

import { h, render, Component } from 'preact';

export default class App extends Component {
	constructor(props) {
		super(props);
			this.state = {
				speed: 10
			}
	}

	render() {
		return (
			<div>
				<img src={preactIcon} style={{width: "200px", height: "200px", animation: `spin ${this.state.speed}s linear infinite` }}/>
				<h3>I am a Preact Component</h3>
			</div>
		);
	}
}

const element = <App />
render(element, document.getElementById('react'));
