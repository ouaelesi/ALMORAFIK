import React, { useEffect, useState } from "react";
import { FormGroup, Input, Spinner } from "reactstrap";

const QuestionBody = () => {
  // State
  const [form, setForm] = useState({ question: "" });
  const [isSubmiting, setIsSubmiting] = useState(false);
  //
  useEffect(() => {
  }, [isSubmiting]);
  //handle chnages & submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      {isSubmiting ? (
        <Spinner />
      ) : (
        <div>
          <div className="ASKYOURQUES">Ask Your Question</div>
          <div className="QuestionBody">
            <form onSubmit={handleSubmit}>
              <p className="QuestionTitle">Title</p>
              <p className="QuestionEXP">
                Be specific and imagine you’re asking a question to another
                person
              </p>

              <Input
                type="text"
                name="QuestionTitle"
                id="QuestionTitle"
                onChange={handleChange}
              ></Input>

              <p className="QuestionTitle">Body</p>
              <p className="QuestionEXP">
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                className="form-control Question_text"
                name="question"
                id="question"
                rows="6"
                onChange={handleChange}
              ></textarea>

              <p className="QuestionTitle">Field</p>
              <p className="QuestionEXP">
                Add to describe what your question is about
              </p>
              <Input
                type="text"
                name="QuestionTitle"
                id="QuestionTitle"
              ></Input>
              <button className="btn review_btn" type="submit">
                Add Question
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBody;
