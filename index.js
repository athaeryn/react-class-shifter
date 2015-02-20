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
      index: 0
    };
  },

  componentDidMount() {
    this.interval = setInterval(this.advance, this.props.speed);
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
    var children = this.props.children.map((child, index) => {
      var props = {
        // Maintain child key
        key: child.key,
        className: classSet({active: this.state.index == index})
      };
      return cloneWithProps(child, props);
    });

    return (
      <div className={this.props.className}>{children}</div>
    );
  }
});
