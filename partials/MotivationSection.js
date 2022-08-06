import React from "react";
import { Button } from "reactstrap";

class Motivation extends React.Component {
  render() {
    return (
      <div className="Motivation">
        <div className="box p-3 fw-bolder  px-md-4 bg-light border border-dark">
          <div className="fs-1 fw-bolder py-4">
            QESTION IS THE HALF OF THE ANSWER
          </div>
          <div className="content  fs-5 mb-2">
            Hey ! i want to ask you a question ten years from now where do u
            want to see yourself ? If you have an answer now that means you have
            a dream and u want to make it true so i'm here to tell you if you
            are working hard work harder if you didnt start yet start now .don't
            give up don't ever stop building yourself though it is exhausting
            because i know it won't be easy .it will be hard and painful you
            will have to sacrifice a lot for this dream but there is a secret
            you should know " it will be worth it so much "..and we create this
            website
            <b> SA9SINI</b> as a support for you in your studies.
          </div>
          <Button className="my-3">Get Motivated</Button>
        </div>
      </div>
    );
  }
}

export default Motivation;
