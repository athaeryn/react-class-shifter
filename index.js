var React = require("react"),
    addons = require("react/addons").addons,
    cloneWithProps = addons.cloneWithProps,
    classSet = addons.classSet;


function getNext() {
  return (this.state.index + 2) % this.state.count;
}


function getPrev() {
  return this.state.index % this.state.count;
}


module.exports = React.createClass({
  getDefaultProps() {
    return {
      speed: 1000,
      className: "class-shifter",
      pauseOnHover: true
    };
  },


  getInitialState() {
    const count = this.props.children.length,
          ctx = { state: { index: -1, count }};
    return {
      count,
      index: 0,
      next: getNext.call(ctx),
      prev: getPrev.call(ctx)
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
    this.setState({
      index: nextIndex,
      next: getNext.call(this),
      prev: getPrev.call(this)
    });
  },


  render() {
    var children, props;

    children = this.props.children.map((child, index) => {
      var props = {
        // Maintain child key
        key: child.key,
        className: classSet({
          active: this.state.index == index,
          next:   this.state.next  == index,
          prev:   this.state.prev  == index
        })
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
