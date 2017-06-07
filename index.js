class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }
  clickedOn(active) {
    this.setState({ active });
  }
  render() {
    const activeItem = this.props.menuItems[this.state.active];
    const tabs = this.props.menuItems.map((item, i) => (
      <li
        key={i}
        className={(this.state.active === i)
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
        <div className="info">Active menu item: {activeItem}</div>
      </nav>
    );
  }
}

ReactDOM.render(
  <Menu menuItems={['Home', 'Services', 'About Us', 'Contact Us']} />,
  document.getElementById('menu')
);

const textToArray = str => str.split('').map(a => a.charCodeAt(0));

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.start = this.props.word.replace(/[a-z]/gi, 'A');
    this.state = {
      code: textToArray(this.start),
      text: this.start,
    };
    this.changeLetter = this.changeLetter.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(this.changeLetter, 50);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  changeLetter() {
    let code = this.state.code;
    let text = this.state.text;
    if (this.props.word === text) {
      clearInterval(this.intervalID);
    }
    for (let i = 0; i < this.props.word.length; i++) {
      if (this.props.word.charCodeAt(i) !== code[i]) {
        code[i] += 1;
        break;
      }
    }
    text = code.map(a => String.fromCharCode(a)).join('');

    this.setState({
      code,
      text,
    });
  }
  render() {
    return (
      <p className="hello">
        {this.state.text}
      </p>
    );
  }
}

ReactDOM.render(
  <Hello word="HELLO REACTJS!" />,
  document.getElementById('hello')
);

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
