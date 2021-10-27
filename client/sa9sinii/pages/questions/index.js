import React, { Component } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import NextPrevious from "../../partials/NextPrevious";
import Question from '../../TemporaryData/Question'

class Questions extends Component {
  render() {
    return (
      <div>
        <div className="Question_container">
          <div className="Questions_section">
            <QuestionsMenu></QuestionsMenu>
            {Question.map((key, elem) => (
              <QuestionBox
                Time={elem.Time}
                user_photo={elem.user_photo}
                More_details={elem.More_details}
                Question={elem.Question}
                number_of_answers={elem.number_of_answers}
                number_of_views={elem.number_of_views}
             />
            ))}
            <NextPrevious></NextPrevious>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
