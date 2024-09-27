import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Input, Spinner } from "reactstrap";
import router, { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { questionsArData } from "../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../data/TemporaryData/staticData/eng/questionsPage";
import {
  faComment,
  faPlus,
  faSquareRootVariable,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { MODE } from "../utils/prod";
import axios from "axios";
import { useSession } from "next-auth/react";

const QuestionBody = ({ staticData }) => {
  const { locale } = useRouter();

  const [questionsData, setQuestionsData] = useState(questionsArData);

  useEffect(() => {
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

  const {
    register,
    getValues,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onTouched" });

  // const { user } = useContext(AuthContext);
  const {data:session , status}=useSession();
  const user = session.user;

  const [isUpdateBoxs, updateBoxs] = useState(false);

  const [questionBoxs, setQuestionBoxs] = useState([
    {
      _id: 0,
      value: "",
      type: "text",
      component: (
        <textarea
          key={0}
          name="answer"
          onChange={(e) => handleChange(0, e.target.value)}
          required="true"
          id="answerInput"
          placeholder=""
          className={`Question_text border px-3 py-2 outline-none  rounded w-100 h-32 ${
            locale == "arab" ? "text-end" : "text-start"
          }`}
          style={{ direction: locale === "arab" ? "rtl" : "ltr" }}
        ></textarea>
      ),
    },
  ]);

  // render the Latex input
  const renderMathQuill = (_id) => {
    if (typeof window !== "undefined") {
      const { addStyles, EditableMathField } = require("react-mathquill");
      addStyles();
      return (
        <div className="" key={_id}>
          <div className="d-flex justify-between">
            <div
              className="bg-dark text-white  px-1  w-fit ml-3"
              style={{
                fontSize: 10,
                borderRadius: "5px 5px 0 0",
                fontFamily: "monospace",
              }}
            >
              Equation
            </div>
          </div>
          <div className="d-flex justify-between align-items-center">
            <button
              onClick={() => insertSymbol(_id, "+")}
              className="btn btn-primary mx-1"
            >
              +
            </button>
            <button
              onClick={() => insertSymbol(_id, "-")}
              className="btn btn-primary mx-1"
            >
              -
            </button>
            <button
              onClick={() => insertSymbol(_id, "*")}
              className="btn btn-primary mx-1"
            >
              *
            </button>
            <button
              onClick={() => insertSymbol(_id, "/")}
              className="btn btn-primary mx-1"
            >
              /
            </button>
          </div>

          <EditableMathField
            latex={""}
            onChange={(mathField) => {
              handleChange(_id, mathField.latex());
            }}
            className={` border px-3 py-2 outline-none  rounded w-100 `}
          />
        </div>
      );
    }
    return null;
  };

  // States
  const [isSubmiting, setIsSubmiting] = useState(false);
  //
  useEffect(() => {
    user ? setValue("creator", user.userName) : setValue("creator", null);
    user
      ? setValue("creatorEmail", user.email)
      : setValue("creatorEmail", null);
    setValue("selectedFile", "");
    setValue("likeCount", 0);
    setValue("createdAt", new Date());
    setValue("answers", []);

    console.log("the values", getValues());
  }, [isSubmiting, user]);

  //handle chnages & submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let questionText = "";
    questionBoxs.forEach((elem) => {
      if (elem.type === "text") {
        questionText = questionText + elem.value + " ";
      } else {
        questionText = questionText + "|||" + elem.value + "||| ";
      }
    });
    setValue("question", questionText);
    console.log("the values ===>", getValues());
    setIsSubmiting(true);
    createQuestion();
  };

  const removeBox = (_id) => {
    let arr = questionBoxs;
    arr.forEach((elem, key) => {
      if (elem._id === _id) arr.splice(key, 1);
    });
    console.log(arr);
    setQuestionBoxs(arr);
  };

  const createQuestion = async () => {
    try {
      const res = await axios.post("/api/questions", getValues(), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (MODE === "pre-Launch") {
        router.push("/questionAdded");
      } else {
        console.log("this is the response: ", res);
        router.push("/questions/" + res.data._id);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (_id, value) => {
    let values = questionBoxs;
    values.forEach((elem, key) => {
      if (elem._id === _id) values[key].value = value;
    });

    setQuestionBoxs(values);
  };

  return (
    <div>
      {isSubmiting ? (
        <div className="w-fit mx-auto py-20">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="ASKYOURQUES">{staticData.bigTitle}</div>
          <div className="QuestionBody  border-2 border-secondary">
            <form onSubmit={handleSubmit}>
              {/* _____________________________________________________________________ */}
              <p className="QuestionTitle mb-2">{staticData.fullName}</p>
              <input
                className={`${locale === "arab" ? "text-end" : "text-start"} ${
                  errors.title
                    ? "border mb-3 border-danger text-danger"
                    : "border"
                } form-control`}
                name="fullName"
                id="fullName"
                required="true"
                {...register("fullName", { required: true, minLength: 8 })}
              ></input>
              {/* _____________________________________________________________________ */}

              <p className="QuestionTitle mb-0 mt-2">{staticData.title}</p>
              <p className="QuestionEXP mb-2">{staticData.titleDescription}</p>
              <input
                className={`${locale === "arab" ? "text-end" : "text-start"} ${
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
              <p className="QuestionTitle mb-0 mt-2">{staticData.body}</p>
              <p className="QuestionEXP mb-2">{staticData.bodyDescription}</p>
              {/* <textarea
                className={`${locale === "arab" ? "text-end" : "text-start"} ${
                  errors.question
                    ? "border border-danger text-danger"
                    : "border"
                } form-control Question_text`}
                name="question"
                id="question"
                required="true"
                rows="6"
                {...register("question", { required: true, minLength: 20 })}
              ></textarea> */}
              {questionBoxs?.map((elem, key) => (
                <div key={elem._id} className="d-flex my-2">
                  {key != 0 && (
                    <div
                      className=" border-t border-l border-b p-1 px-2 mt-4 w-fit h-fit cursor-pointer"
                      style={{
                        fontSize: 7,
                        borderRadius: " 7px  0 0 7px",
                        fontFamily: "monospace",
                      }}
                      onClick={() => {
                        removeBox(elem._id);
                        updateBoxs(!isUpdateBoxs);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faX}
                        style={{ fontSize: "10", marginTop: 4 }}
                        className=""
                      />
                    </div>
                  )}
                  <div className="w-100">{elem.component}</div>
                </div>
              ))}

              <div
                className={`d-flex gap-2 mb-5 ${
                  locale === "arab" ? " flex-row-reverse" : ""
                }`}
              >
                <button
                  className={`btn bg-light border d-flex gap-2  ${
                    locale === "arab" ? " flex-row-reverse" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    let arr = questionBoxs;
                    arr.push({
                      _id: arr.length,
                      value: "",
                      type: "text",
                      component: (
                        <textarea
                          key={arr.length}
                          name="answer"
                          onChange={(e) =>
                            handleChange(arr.length - 1, e.target.value)
                          }
                          required="true"
                          placeholder=""
                          className={` border px-3 py-2 outline-none  rounded w-100 h-32 ${
                            locale == "arab" ? "text-end" : "text-start"
                          }`}
                          style={{
                            direction: locale === "arab" ? "rtl" : "ltr",
                          }}
                        ></textarea>
                      ),
                    });
                    setQuestionBoxs(arr);
                    updateBoxs(!isUpdateBoxs);
                    console.log(questionBoxs);
                  }}
                >
                  {questionsData.questionAnswers.addTextBlock}
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ fontSize: "15", marginTop: 5 }}
                    className="text-dark"
                  />
                </button>{" "}
                <button
                  className={`btn bg-light border d-flex gap-2  ${
                    locale === "arab" ? " flex-row-reverse" : ""
                  }`}
                  type="button"
                  onClick={() => {
                    let arr = questionBoxs;
                    arr.push({
                      _id: arr.length,
                      value: "",
                      type: "latex",
                      component: renderMathQuill(arr.length),
                    });
                    setQuestionBoxs(arr);
                    updateBoxs(!isUpdateBoxs);
                  }}
                >
                  {questionsData.questionAnswers.addLatexBlock}
                  <FontAwesomeIcon
                    icon={faSquareRootVariable}
                    style={{ fontSize: "15", marginTop: 5 }}
                    className="text-dark"
                  />
                </button>
              </div>

              {errors.question && (
                <label className="text-danger fs-6">
                  * The Title must be greater then 20 chars
                </label>
              )}

              <p className="QuestionTitle my-2">{staticData.subject}</p>
              <select
                className={`${locale === "arab" ? "text-end" : "text-start"} ${
                  errors.title ? "border border-danger text-danger" : "border"
                } form-control`}
              >
                <option disabled selected value="">
                  {staticData.subject}
                </option>
                <option value="math">Math</option>
              </select>

              <p className="QuestionTitle mb-0 mt-2">{staticData.tags}</p>
              <p className="QuestionEXP mb-2">{staticData.tagsDescription}</p>
              <input
                className={`
                ${locale === "arab" ? "text-end" : "text-start"}
                ${
                  errors.tags ? "border border-danger text-danger" : "border"
                } form-control `}
                name="tags"
                required="true"
                id="QuestionTitle"
                placeholder="math , science ,..."
                {...register("tags", { required: true, minLength: 3 })}
              ></input>
              {errors.tags && (
                <label className="text-danger fs-6 block">
                  * The Title must be greater then 3 chars
                </label>
              )}
              <button className="btn review_btn" type="submit">
                {staticData.action}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBody;
