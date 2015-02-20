var React = require("react");

module.exports = React.createClass({
  render() {
    let greeting = `Hello world, it's ${(new Date).toLocaleDateString()}`;
    return (
      <h1>{greeting}</h1>
    );
  }
});
