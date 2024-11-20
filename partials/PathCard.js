import React from "react";

class PathCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="PathCard mx-auto my-4 bg-light        ">
        <div className="CardIcon mb-4 mx-auto  w-fit">
          <img src={this.props.icon} width="70px"></img>
        </div>
        <div className="CardTitle">{this.props.Title}</div>
      </div>
    );
  }
}

export default PathCard;
