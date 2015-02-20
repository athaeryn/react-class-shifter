var React = require("react"),
    addons = require("react/addons").addons,
    cloneWithProps = addons.cloneWithProps,
    classSet = addons.classSet;


module.exports = React.createClass({
  getDefaultProps() {
    return {
      speed: 1000,
      className: "class-shifter",
      pauseOnHover: true
    };
  },


  getInitialState() {
    return {
      count: this.props.children.length,
      index: 0
    };
  },


  play() {
    // Ensure we only have one interval at a time.
    this.pause();
    this.interval = setInterval(this.advance, this.props.speed);
  },


  pause() {
    clearInterval(this.interval);
    this.interval = null;
  },


  componentDidMount() {
    this.interval = null;
    this.play();
  },


  componentWillUnmount() {
    clearInterval(this.interval);
  },


  advance() {
    var nextIndex = this.state.index + 1;
        if (nextIndex >= this.state.count) {
          nextIndex = 0;
        }
    this.setState({index: nextIndex});
  },


  render() {
    var children, props;

    children = this.props.children.map((child, index) => {
      var props = {
        // Maintain child key
        key: child.key,
        className: classSet({active: this.state.index == index})
      };
      return cloneWithProps(child, props);
    });

    props = {
      className: this.props.className
    };

    if (this.props.pauseOnHover) {
      props.onMouseEnter = this.pause;
      props.onMouseLeave = this.play;
    }

    return <div {...props}>{children}</div>;
  }
});
