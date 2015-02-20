var React = require("react"),
    ClassShifter = require("../");


var node = document.getElementById("slider");

React.render((
  <ClassShifter speed={2000}>
    <div className="slide" key="1">slide 1</div>
    <div className="slide" key="2">slide 2</div>
    <div className="slide" key="3">slide 3</div>
  </ClassShifter>
), node);
