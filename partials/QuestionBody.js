import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Input, Spinner } from "reactstrap";
import router from "next/router";
import AuthContext from "../utils/AuthContext";
import { useForm } from "react-hook-form";

const QuestionBody = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  const { user } = useContext(AuthContext);

  // States
  const [isSubmiting, setIsSubmiting] = useState(false);
  //
  useEffect(() => {
    user ? setValue("creator", user.userName) : setValue("creator", null);
    user ? setValue("creatorEmail", user.email) : setValue("creator", null);
    setValue("selectedFile", "");
    setValue("likeCount", 0);
    setValue("createdAt", new Date());
    setValue("answers", []);

    console.log("the values", getValues());
  }, [isSubmiting, user]);

  //handle chnages & submit
  const handleSubmit = (e) => {
    console.log("the values ===>", getValues());
    e.preventDefault();
    setIsSubmiting(true);
    createQuestion();
    router.push("/questions");
  };

  const createQuestion = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getValues()),
      });
    } catch (err) {}
  };
  return (
    <div>
      {isSubmiting ? (
        <Spinner />
      ) : (
        <div>
          <div className="ASKYOURQUES">Ask Your Question</div>
          <div className="QuestionBody  border-2 border-secondary">
            <form onSubmit={handleSubmit}>
              <p className="QuestionTitle mb-0 ">Title</p>
              <p className="QuestionEXP mb-2">
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                className={`${
                  errors.title ? "border border-danger text-danger" : "border"
                } form-control`}
                name="title"
                id="title"
                required="true"
                {...register("title", { required: true, minLength: 8 })}
              ></input>
              {errors.title && (
                <label className="text-danger fs-6">
                  * The Title must be greater than 8 chars
                </label>
              )}
              <p className="QuestionTitle mb-0 mt-2">Body</p>
              <p className="QuestionEXP mb-2">
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                className={`${
                  errors.question
                    ? "border border-danger text-danger"
                    : "border"
                } form-control Question_text`}
                name="question"
                id="question"
                required="true"
                rows="6"
                {...register("question", { required: true, minLength: 20 })}
              ></textarea>
              {errors.question && (
                <label className="text-danger fs-6">
                  * The Title must be greater then 20 chars
                </label>
              )}

              <p className="QuestionTitle mb-0 mt-2">Tags</p>
              <p className="QuestionEXP mb-2">
                Add some tags to describe what your question is about
              </p>
              <input
                className={`${
                  errors.tags ? "border border-danger text-danger" : "border"
                } form-control `}
                name="tags"
                required="true"
                id="QuestionTitle"
                placeholder="math , science ,..."
                {...register("tags", { required: true, minLength: 3 })}
              ></input>
              {errors.tags && (
                <label className="text-danger fs-6">
                  * The Title must be greater then 3 chars
                </label>
              )}
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
