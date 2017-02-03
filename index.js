class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
    this.menuItems = ['Home', 'Services', 'About Us', 'Contact Us'];
  }
  clickedOn(active) {
    this.setState({ active });
  }
  render() {
    const tabs = this.menuItems.map((item, i) => (
      <li
        key={i}
        className={this.state.active === i
          ? 'menu__item menu__item--active'
          : 'menu__item'}
        onClick={() => this.clickedOn(i)}
      >{item}</li>
    ));
    return (
      <nav>
        <ul className="menu">
          {tabs}
        </ul>
        <div className="info">Active menu item: {this.menuItems[this.state.active]}</div>
      </nav>
    );
  }
}

ReactDOM.render(<Menu />, document.getElementById('menu'));

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.target = 'HELLO WORLD!';
    this.start = this.target.replace(/[a-z]/gi, 'A');
    this.state = {
      hello: {
        code: this.textToArray(this.start),
        text: this.start,
      },
    };
  }
  textToArray(str) {
    return str.split('').map(a => a.charCodeAt(0));
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.changeLetter(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  changeLetter() {
    let code = this.state.hello.code;
    let text = this.state.hello.text;
    if (this.target === text) {
      clearInterval(this.intervalID);
    }
    for (let i = 0; i < this.target.length; i++) {
      if (this.target.charCodeAt(i) !== code[i]) {
        code[i] += 1;
        break;
      }
    }
    text = code.map(a => String.fromCharCode(a)).join('');
    this.setState({
      hello: {
        code,
        text,
      },
    });
  }
  render() {
    return (<p className="hello">{this.state.hello.text}</p>);
  }
}

ReactDOM.render(<Hello />, document.getElementById('hello'));

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
    };
  }
  // called when component has been rendered
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 50);
  }
  // called right before the component is removed and destroyed
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick() {
    this.setState({
      elapsed: new Date() - this.props.start,
    });
  }
  render() {
    const elapsed = Math.round(this.state.elapsed / 100);
    const seconds = (elapsed / 10).toFixed(1);
    return (
      <p>This timer was started {seconds} secs ago.</p>
    );
  }
}

ReactDOM.render(
  <Timer start={Date.now()} />,
  document.getElementById('timer')
);
