import React, { Component } from "react";
class LoginSteps extends Component {
  render() {
    return (
      <div className="loginstepsContainer ">
        <div className="JOINUS">Join Us</div>
        <div className="loginsteps">
          <div className="loginstep my-3 grid">
            <img
              className="mr-3"
              src="/assets/imgs/ask_ques.png"
              width="60px"
            ></img>{" "}
            this is a step to log in{" "}
          </div>
          <div className="loginstep my-3 grid">
            <img
              className="mr-3"
              src="/assets/imgs/answer.png"
              width="60px"
            ></img>{" "}
            this is a step to log in{" "}
          </div>
          <div className="loginstep my-3 grid">
            <img
              className="mr-3"
              src="/assets/imgs/validate.png"
              width="60px"
            ></img>{" "}
            this is a step to log in{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSteps;
