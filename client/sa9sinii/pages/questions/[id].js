import React from 'react' ; 
import fetch from 'isomorphic-unfetch'
import QuestionBox from '../../partials/QuestionBox';

const QuestionDetails = ({questionData}) => {
    return (
        <div>
            <QuestionBox   id ={questionData._id}
                Time={questionData.createdAt}
                user_photo={questionData.user_photo}
                creator = {questionData.creator}
                More_details={questionData.More_details}
                Question={questionData.question}
                number_of_answers={questionData.answers.length}
                number_of_likes={questionData.likeCount}></QuestionBox>
        </div>
    );
};


export default QuestionDetails;

QuestionDetails.getInitialProps = async ({query : {id}})=>{
      const res = await fetch(`http://localhost:3000/api/questions/${id}`)
      const Data = await res.json() ;
      return{questionData : Data}
}