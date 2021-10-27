import React, { Component } from 'react'
import {Row} from 'reactstrap'


class QuestionBox extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <>
               <div className="Question_info">
               <img src={this.props.user_photo}></img> Asked {this.props.Time}     
               </div>
               <div className="question_section">
                <p className="question">{this.props.Question}</p>
                <p className="question_details">{this.props.More_details}</p>
                <div className="stat ">
                <Row className="info_row d-flex align-items-center ">
                    <div className="col-4 col-sm-3">
                        <button className="btn Question_Statistics">{this.props.number_of_answers} Answers</button>
                        </div>  
                    <div className="col-4 col-sm-3">
                    <button className="btn Question_Statistics">{this.props.number_of_views} views </button> </div>  
                    <div className="col-4 col-sm-3 ml-auto"><button className="btn btn_answer">Answer</button></div>  
                 </Row>  
                </div>
               
               </div>
               <hr></hr>
            </>
        );
    }
}

export default QuestionBox ; 