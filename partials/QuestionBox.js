import React, { useState, useContext, useEffect, useRef } from "react";
import router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTrashCan,
  faPen,
  faBookmark as solidBookMark,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import AuthContext from "../utils/AuthContext";

import { displayDate } from "../utils/date";
import { noteQuestionMut, saveQuestionMut } from "../services/questions";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useSession } from "next-auth/react";

const QuestionBox = (props) => {
  const { locale } = useRouter();
  const { data: user, status } = useSession();

  const [numLikes, setNumLikes] = useState(props.number_of_likes);
  const [isQuestionSaved, setSaved] = useState(props.saved);
  const [myNote, setMynote] = useState(props.userNote);
  const [isEditing, setIsEditing] = useState(false);
const [editedQuestion, setEditedQuestion] = useState(props.Question);
const initializeSections = (question) => {
  const parts = question.split("|||");
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return { type: "text", content: part };
    } else {
      return { type: "latex", content: part };
    }
  });
};

const [sections, setSections] = useState(initializeSections(props.Question));
  const router = useRouter();
  useEffect(() => {}, [user]);

  const updateQuesLikes = (num) => {
    if (user) {
      setNumLikes(numLikes + num);
      const queUpdates = fetch(`/api/questions/updateLikes/${props.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addedValue: num }),
      });
    } else {
      router.push("/signUp");
    }
  };

  const editQuestion = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e, index) => {
    const updatedSections = [...sections];
    updatedSections[index].content = e.target.value;
    setSections(updatedSections);
    setEditedQuestion(updatedSections.map((section) => section.content).join("|||"));
  };

  const addTextArea = () => {
    setSections([...sections, { type: "text", content: "" }]);
  };
  
  const addLatexArea = () => {
    setSections([...sections, { type: "latex", content: "" }]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/questions/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: editedQuestion }),
      });
  
      if (response.ok) {
        setIsEditing(false);
        // router.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error updating question:", error);
      alert("An error occurred while updating the question. Please try again.");
    }
  };

  const supQuestion = async (id) => {
    alert("do you want to delete !!");
    const re = await fetch(`/api/questions/${id}`, {
      method: "DELETE",
    });
    router.push("/questions");
  };

  const getQuestion = () => {
    router.push(`/questions/${props.id}`);
  };

  // save question
  const saveQuestion = async () => {
    const response = await saveQuestionMut(props.id);
    setSaved(!isQuestionSaved);
  };

  // note question (upvote or downvote)
  const noteQuestion = async (note) => {
    if (!user) {
      router.push("/signUp");
      return;
    }

    try {
      const response = await fetch("/api/ressources/user-actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _idUser: user.id,
          _idResource: props.id,
          voteType: note === 1 ? "upvote" : "downvote",
        }),
      });

      if (response.ok) {
        setMynote(myNote + note);
        setNumLikes(numLikes + note);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert("An error occurred while voting. Please try again.");
    }
  };

  const renderMathQuill = (latex) => {
    if (typeof window !== "undefined") {
      const {
        addStyles,
        EditableMathField,
        StaticMathField,
      } = require("react-mathquill");
      addStyles();
      return (
        <div>
          <StaticMathField
            className={` text-light bg-dark border px-3 py-2 outline-none border-dark rounded w-100 my-2`}
          >
            {latex}
          </StaticMathField>
        </div>
      );
    }
    return null;
  };
  const handleLatexChange = (latex, index) => {
    const updatedSections = [...sections];
    updatedSections[index].content = latex;
    setSections(updatedSections);
    setEditedQuestion(updatedSections.map((section) => section.content).join("|||"));
  };

  const renderEditableMathQuill = (latex, index) => {
    if (typeof window !== "undefined") {
      const {
        addStyles,
        EditableMathField,
      } = require("react-mathquill");
      addStyles();
      return (
        <EditableMathField
          latex={latex}
          onChange={(mathField) => handleLatexChange(mathField.latex(), index)}
          className={`text-light bg-dark border px-3 py-2 outline-none border-dark rounded w-100 my-2`}
        />
      );
    }
    return null;
  };


  // Filter image files
  const imageFiles = props.files?.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  // Filter other files
  const otherFiles = props.files?.filter(file => !/\.(jpg|jpeg|png|gif)$/i.test(file));

  const signalerQuestion = async () => {
    try {
      const response = await fetch(`/api/questions/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId: props.id }),
      });

      if (response.ok) {
        alert("Question reported successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error reporting question:", error);
      alert("An error occurred while reporting the question. Please try again.");
    }
  };

  const isArabic = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  const imageGalleryRef = useRef(null);

  const renderImageGallery = () => {
    if (!imageFiles || imageFiles.length === 0) return null;

    const images = imageFiles.map(file => ({
      original: file,
      thumbnail: file,
    }));

    const additionalImagesCount = images.length - 4;

    const handleImageClick = (index) => {
      setShowGallery(true);
      setStartIndex(index);
      setTimeout(() => {
        if (imageGalleryRef.current) {
          imageGalleryRef.current.fullScreen();
        }
      }, 100);
    };

    return (
      <div className="image-gallery-container">
        {!showGallery && images.length === 1 && (
          <div className=" flex justify-center w-full">
            <img src={images[0].original} alt="Main" onClick={() => handleImageClick(0)} />
          </div>
        )}
        {!showGallery && images.length>=2 && (
          <div className="main-image">
            <img src={images[0].original} alt="Main" onClick={() => handleImageClick(0)} />
          </div>
        )}
        {!showGallery && images.length>=2 && (
          <div className="stacked-images">
          {images.slice(1, 4).map((image, index) => (
            <div key={index} className="stacked-image-container">
              <div className="stacked-image">
                <img src={image.original} alt={`Stacked ${index + 1}`} onClick={() => handleImageClick(index + 1)} />
                {index === 2 && additionalImagesCount > 0 && (
                  <div className="overlay" onClick={()=> handleImageClick(index + 1)}>
                    +{additionalImagesCount}
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        )}
        {showGallery && (
          <ImageGallery
            ref={imageGalleryRef}
            items={images}
            showThumbnails={false}
            startIndex={startIndex}
            useWindowKeyDown={true}
            onScreenChange={(bool) => setShowGallery(bool)}
          />
        )}
      </div>
    );
  };

  const [showGallery, setShowGallery] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <div className="QuestionBox my-3 px-md-5 py-2 px-3  border-secondary">
      <div
        className={`Question_info d-flex justify-content-between  ${
          locale === "arab" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`pt-3 px-2 d-flex gap-2 ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          {!props.user_photo ? <FontAwesomeIcon
            icon={faCircleUser}
            style={{ fontSize: "30", marginRight: 10 }}
            className="text-dark"
          />: <img src={props.user_photo} className="rounded-full h-9 w-9 cursor-pointer border-2 border-gray-300" />}
          <div
            className={`pt-1 d-flex gap-2  ${
              locale === "arab" ? "flex-row-reverse" : ""
            }`}
          >
            <p>
              {" "}
              {props.staticData.questionsBox.askedBy}
              <p>
                {" "}
                <b className="text-black/40 text-xs ">{displayDate(props.Time)}</b>
              </p>
            </p>
            <b className="text-dark underline">{props.creator}</b>
          </div>
        </div>

        <button className="" onClick={() => saveQuestion()}>
          <FontAwesomeIcon
            icon={isQuestionSaved ? solidBookMark : faBookmark}
            style={{ fontSize: "28" }}
            className="text-warning "
          />
        </button>
      </div>
      <div
        className={`d-flex   ${locale === "arab" ? "flex-row-reverse" : ""}`}
      >
        <div className="align-items-center fs-4  mx-auto text-center h-fit my-auto  px-1">
          {myNote != 1 ? (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="fs-1 "
              onClick={() => noteQuestion(1)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1 "
              style={{ color: "transparent" }}
            />
          )}
          <div>{numLikes}</div>
          {myNote != -1 ? (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1"
              onClick={() => noteQuestion(-1)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fs-1 "
              style={{ color: "transparent" }}
            />
          )}
        </div>
        <div className="px-md-5 py-3 px-2 w-100">
          <div
            className={`fw-bold fs-4 mb-2 ${
              locale === "arab" ? " text-end" : " text-start"
            }`}
          >
            {props.title}
          </div>
          
          {isEditing ? (
  <form onSubmit={handleEditSubmit}>
    {sections.map((section, key) =>
      section.type === "latex" ? (
        renderEditableMathQuill(section.content, key)
      ) : (
        <textarea
          key={key}
          className="form-control"
          value={section.content}
          onChange={(e) => handleEditChange(e, key)}
          rows="5"
        />
      )
    )}
    <button type="button" className="btn btn-secondary mt-2" onClick={addTextArea}>
      Add Text Area
    </button>
    <button type="button" className="btn btn-secondary mt-2" onClick={addLatexArea}>
      Add LaTeX Area
    </button>
    <button type="submit" className="btn btn-primary mt-2">
      Save
    </button>
    <button
      type="button"
      className="btn btn-secondary mt-2"
      onClick={() => setIsEditing(false)}
    >
      Cancel
    </button>
  </form>
) : (
  <p
    className={`bg-light p-3 rounded-3 border cursor-pointer ${
      locale === "arab" ? "text-end" : "text-start"
    }`}
    onClick={getQuestion}
    dir={isArabic(props.Question) ? "rtl" : "ltr"}
  >
    {sections.map((section, key) =>
      section.type === "latex" ? (
        renderMathQuill(section.content)
      ) : (
        <pre
          key={key}
          style={{
            direction: isArabic(section.content) ? "rtl" : "ltr",
            whiteSpace: "pre-wrap",
          }}
        >
          {section.content}
        </pre>
      )
    )}
  </p>
)}
          <p
            className={`question_details ${
              locale === "arab" ? " text-end" : " text-start"
            }`}
            dir={isArabic(props.More_details) ? "rtl" : "ltr"}
          >
            {props.More_details}
          </p>

          {/* Image Carousel */}
          {renderImageGallery()}

          {/* Other Files */}
          {otherFiles?.length > 0 && (
            <div className="my-3">
              <h5>Attached Files:</h5>
              <ul>
                {otherFiles.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer">
                      {file.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-3">
            <div
              className={`d-flex   ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className="mt-1 underline cursor-pointer"
                onClick={() => router.push(`/questions/${props.id}`)}
              >
                {props.number_of_answers}{" "}
                {props.staticData.questionsBox.answers}
              </div>
              <div className="px-4 mt-1">
                {numLikes} {props.staticData.questionsBox.likes}{" "}
              </div>
              <div
                className={`   ${locale === "arab" ? "mr-auto" : "ml-auto"}`}
              >
                <button
                  className="btn  mt-1 btn_answer "
                  onClick={() => router.push(`/questions/${props.id}`)}
                >
                  {props.staticData.questionsBox.answer}
                </button>
              </div>
            </div>
            <div
              className={
                locale === "arab"
                  ? "d-flex justify-content-end"
                  : "d-flex justify-content-start"
              }
            >
              {props.tags.map((tag, key) => (
                <span
                  className="px-2 rounded-2 quesTag text-dark bg-light  fw-light py-1"
                  key={key}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <FacebookShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              quote={props.title + "\n"}
              hashtag={"#ALMORAFIK"}
              windowHeight={700}
              windowWidth={800}
            >
              <FacebookIcon size={25} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <TwitterIcon size={25} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <WhatsappIcon size={25} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={"https://sa-9-sini-website.vercel.app/questions/" + props.id}
              title={"سؤال على منصة المرافق:" + "\n" + props.title + "\n" + ""}
              windowHeight={700}
              windowWidth={800}
            >
              <EmailIcon size={25} round />
            </EmailShareButton>
          </div>

          {user && user.email == props.creatorEmail && (
            <div className="mt-3">
              <button className="btn border mx-1" onClick={editQuestion}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="btn border mx-1"
                onClick={() => supQuestion(props.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button
                className="btn border mx-1"
                onClick={signalerQuestion}
              >
                <FontAwesomeIcon icon={faWarning} color="red" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;