var React = require("react"),
    ClassShifter = require("../");


var node = document.getElementById("slider"),
    callback = console.log.bind(console);

React.render((
  <ClassShifter speed={2000} callback={callback}>
    <div className="slide" key="1">slide 1</div>
    <div className="slide" key="2">slide 2</div>
    <div className="slide" key="3">slide 3</div>
    <div className="slide" key="4">slide 4</div>
    <div className="slide" key="5">slide 5</div>
  </ClassShifter>
), node);
