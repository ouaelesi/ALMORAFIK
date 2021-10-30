import {Row} from 'reactstrap'
import React from 'react';

const QuestionBox = (props) => {
    return (
        <div>
            <div className="Question_info">
               <img src={props.user_photo}></img> Asked {props.Time}     
               </div>
               <div className="question_section">
                <p className="question">{props.Question}</p>
                <p className="question_details">{props.More_details}</p>
                <div className="stat ">
                <Row className="info_row d-flex align-items-center ">
                    <div className="col-4 col-sm-3">
                        <button className="btn Question_Statistics">{props.number_of_answers} Answers</button>
                        </div>  
                    <div className="col-4 col-sm-3">
                    <button className="btn Question_Statistics">{props.number_of_views} views </button> </div>  
                    <div className="col-4 col-sm-3 ml-auto"><button className="btn btn_answer">Answer</button></div>  
                 </Row>  
                </div>
               
               </div>
               <hr></hr>
        </div>
    );
};

export default QuestionBox;