import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Input, Spinner } from "reactstrap";
import router from "next/router";
import AuthContext from "../utils/AuthContext";

const QuestionBody = () => {
  const { user } = useContext(AuthContext);

  // State
  const [form, setForm] = useState({
    question: "",
    creator: user ? user.userName : null,
    creatorEmail: user ? user.email : null,
    tags: ["String"],
    selectedFile: "String",
    likeCount: 0,
    createdAt: new Date(),
    answers: [],
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  //
  useEffect(() => {
    setForm({
      ...form,
      ["creator"]: user ? user.userName : null,
      ["creatorEmail"]: user ? user.email : null,
    });
  }, [isSubmiting, user]);

  //handle chnages & submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmiting(true);
    createQuestion();
    router.push("/questions");
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const createQuestion = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/questions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      alert("done");
    } catch (err) {}
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
              <p className="QuestionTitle mb-0 ">Title</p>
              <p className="QuestionEXP mb-2">
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <Input
                type="text"
                name="QuestionTitle"
                id="QuestionTitle"
                onChange={handleChange}
              ></Input>

              <p className="QuestionTitle mb-0 mt-2">Body</p>
              <p className="QuestionEXP mb-2">
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

              <p className="QuestionTitle mb-0 mt-2">Tags</p>
              <p className="QuestionEXP mb-2">
                Add some tags to describe what your question is about
              </p>
              <Input
                type="text"
                name="tags"
                id="QuestionTitle"
                onChange={handleChange}
                placeholder="math , science ,..."
              ></Input>
              <button className="btn review_btn" type="submit">
                ADD QUESTION
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBody;
