import { h, Component } from "preact";
import habitat from "preact-habitat";

class HelloWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render({ name }, { time }) {
    return <div class="container jumbotron">
      <h1>
        {`Hello ${name}`}
        <small>{` - time is: ${time}`}</small>
      </h1>
    </div>;
  }
}

let helloWidgetHabitat = habitat(HelloWidget);

helloWidgetHabitat.render({
  inline: true
});
