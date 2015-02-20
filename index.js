var React = require("react"),
    addons = require("react/addons").addons,
    cloneWithProps = addons.cloneWithProps,
    classSet = addons.classSet;

module.exports = React.createClass({
  getDefaultProps() {
    return {
      speed: 1000,
      className: "class-shifter"
    };
  },

  getInitialState() {
    return {
      interval: null,
      count: this.props.children.length,
      index: 0,
      paused: false
    };
  },

  play() {
    this.interval = setInterval(this.advance, this.props.speed);
    this.setState({paused: false});
  },

  pause() {
    clearInterval(this.interval);
    this.setState({paused: true});
  },

  componentDidMount() {
    this.play();
  },

  componentWillUnmount() {
    this.pause();
  },

  advance() {
    var nextIndex = this.state.index + 1;
        if (nextIndex >= this.state.count) {
          nextIndex = 0;
        }
    this.setState({index: nextIndex});
  },

  render() {
    var children, classes;

    children = this.props.children.map((child, index) => {
      var props = {
        // Maintain child key
        key: child.key,
        className: classSet({active: this.state.index == index})
      };
      return cloneWithProps(child, props);
    });

    classes = classSet({
      [this.props.className]: true,
      paused: this.state.paused
    });

    return (
      <div
        className={classes}
        onMouseEnter={this.pause}
        onMouseLeave={this.play}
      >
        {children}
      </div>
    );
  }
});
