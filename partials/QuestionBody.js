import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Input, Spinner } from "reactstrap";
import router, { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { questionsArData } from "../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../data/TemporaryData/staticData/eng/questionsPage";
import { useSession } from "next-auth/react";
import { MODE } from "../utils/prod";
import axios from "axios";
import {
  faComment,
  faPlus,
  faSquareRootVariable,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useEdgeStore } from '../lib/edgestore';

const uploadFilesToEdgeStore = async (files, edgestore) => {
  const fileUrls = [];
  for (let i = 0; i < files.length; i++) {
    try {
      const res = await edgestore.publicFiles.upload({
        file: files[i],
        onProgressChange: (progress) => {
          console.log(`Uploading file ${i + 1}/${files.length}:`, progress);
        },
      });
      fileUrls.push(res.url);
    } catch (error) {
      console.error(`Error uploading file ${i + 1}:`, error);
      throw error;
    }
  }
  return fileUrls;
};

const QuestionBody = ({ staticData }) => {
  const { locale } = useRouter();
  const { edgestore } = useEdgeStore();

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

  const { data: session, status } = useSession();

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
          className={`Question_text border px-3 py-2 outline-none rounded w-100 h-32 ${
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
              className="bg-dark text-white px-1 w-fit ml-3"
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
            className={`border px-3 py-2 outline-none rounded w-100`}
          />
        </div>
      );
    }
    return null;
  };

  // States
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const user = session.user;
      user ? setValue("creator", user.userName) : setValue("creator", null);
      user
        ? setValue("creatorEmail", user.email)
        : setValue("creatorEmail", null);
      setValue("selectedFile", "");
      setValue("likeCount", 0);
      setValue("createdAt", new Date());
      setValue("answers", []);

      console.log("the values", getValues());
    }
  }, [isSubmiting, session, status]);

  //handle changes & submit
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
    const values = getValues();
    values.fullName = session.user.email;

    const files = document.getElementById("files").files;
    let fileUrls = [];

    try {
      // Upload files to Edge Store
      fileUrls = await uploadFilesToEdgeStore(files, edgestore);

      console.log("File URLs:", fileUrls);
      // Add file URLs to values
      values.files = fileUrls;

      // Send form data to backend
      const res = await axios.post("/api/questions", values, {
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

  const isArabic = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
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
          <div className="QuestionBody border-2 border-secondary">
            <form onSubmit={handleSubmit}>
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

              {questionBoxs?.map((elem, key) => (
                <div key={elem._id} className="d-flex my-2">
                  {key != 0 && (
                    <div
                      className="border-t border-l border-b p-1 px-2 mt-4 w-fit h-fit cursor-pointer"
                      style={{
                        fontSize: 7,
                        borderRadius: "7px 0 0 7px",
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
                  locale === "arab" ? "flex-row-reverse" : ""
                }`}
              >
                <button
                  className={`btn bg-light border d-flex gap-2 ${
                    locale === "arab" ? "flex-row-reverse" : ""
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
                          className={`border px-3 py-2 outline-none rounded w-100 h-32 ${
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
                </button>
                <button
                  className={`btn bg-light border d-flex gap-2 ${
                    locale === "arab" ? "flex-row-reverse" : ""
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

              <p className="QuestionTitle my-2">{staticData.files}</p>

              <input
                type="file"
                id="files"
                name="files"
                multiple
                className="form-control"
              />

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