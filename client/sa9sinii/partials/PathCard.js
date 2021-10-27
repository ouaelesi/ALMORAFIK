import React from 'react' ; 

class PathCard extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="PathCard">
              <div className="CardIcon mb-4">
                  <img src={this.props.icon} width="35%"></img>
              </div>
              <div className="CardTitle">
                  {this.props.Title}
              </div>
              <div className="CardText">
                  {this.props.Text}
              </div>

            </div>
        );
    }
   
}

export default PathCard ; 