import React, { Component } from "react";
import {FormGroup,Input} from 'reactstrap'

class QuestionBody extends Component {
  render() {
    return (
      <div>
        <div className="ASKYOURQUES">Ask Your Question</div>
        <div className="QuestionBody">
          <FormGroup>
            <p className="QuestionTitle">Title</p>
            <p className="QuestionEXP">
              Be specific and imagine you’re asking a question to another person
            </p>
            <Input type="text" name="QuestionTitle" id="QuestionTitle"></Input>

            <p className="QuestionTitle">Body</p>
            <p className="QuestionEXP">
              Include all the information someone would need to answer your
              question
            </p>
            <textarea
              className="form-control Question_text"
              name="QuestionTitle"
              id="QuestionTitle "
              rows="6"
            ></textarea>

            <p className="QuestionTitle">Field</p>
            <p className="QuestionEXP">
              Add to describe what your question is about
            </p>
            <Input type="text" name="QuestionTitle" id="QuestionTitle"></Input>
          </FormGroup>
        </div>
        <button className="btn review_btn">Review Your Question</button>
      </div>
    );
  }
}

export default QuestionBody;
