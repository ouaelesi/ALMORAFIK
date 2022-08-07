import React, { Component } from "react";

class WhoAreWe extends Component {
  render() {
    return (
      <div className="whoarewe ">
        <div className="row">
          <div className="col-md-5  fw-bolder">
            <div className="fs-1 fw-bolder w-fit">
              WHO ARE WE?
              <div className="yellow_line w-25 mx-auto"></div>
            </div>
            <p className=" fs-4 fw-lighter mt-3 ">
              We are a group of 7 university students in different fields (
              computer science, medicine, and commerce). However we share the
              same goal and the same vision. We unified our ideas and our
              efforts to come up with this website which we aspire that it will
              realize our purpose in giving the support and spreading the sense
              of altruism.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default WhoAreWe;
