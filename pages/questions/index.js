import React, { useState, useEffect } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import NextPrevious from "../../partials/NextPrevious";
import fetch from "isomorphic-unfetch";

import { questionsArData } from "../../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../../data/TemporaryData/staticData/eng/questionsPage";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import Tilt from "react-parallax-tilt";

const Questions = ({ questions }) => {
  const [questionsLanuched, luanchQuestions] = useState(true);

  const { locale } = useRouter();

  // state
  const [questionsData, setQuestionsData] = useState(questionsArData);
  const [userPhotos, setUserPhotos] = useState({});

  useEffect(() => {
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

  // Pagination vars and Functions
  const QuetionsPerPage = 5;
  const [maxNumPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const IsOnCurrentPage = (id) => {
    return Math.floor(id / QuetionsPerPage) === currentPage;
  };

  // data fetching
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMaxPages(Math.floor((data.length - 1) / QuetionsPerPage) + 1);
        setLoading(false);
        fetchUserPhotos(data);
      });
  }, []);

  const fetchUserPhotos = async (questions) => {
    const userIds = questions.map((question) => question.creatorEmail);
    const uniqueUserIds = [...new Set(userIds)];
    const userPhotos = {};

    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        const res = await fetch(`/api/users/${userId}`);
        const userData = await res.json();
        userPhotos[userId] = userData.photo;
      })
    );

    setUserPhotos(userPhotos);
  };

  // todo remove this and sidplay questions

  if (!questionsLanuched)
    return (
      <div className="h-screen">
        <Tilt tiltReverse>
          <div className="w-1/4 mx-auto">
            <Image
              src="/assets/imgs/questionsillustration.svg"
              width="200"
              height="200"
              alt="almorafiq success image"
              className="block mx-auto mt-20 w-100 cursor-pointer"
            />
          </div>
        </Tilt>

        <p
          className="text-center text-lg mt-4  "
          style={{ fontSize: 35, fontWeight: "bold" }}
        >
          مرحبا بك في فضاء الأسئلة
        </p>
        <p
          className="text-center text-lg mt-4 w-1/2 mx-auto "
          style={{ fontSize: 20, fontWeight: "normal" }}
        >
          في هذه المساحة، يمكنك طرح أسئلتك وسيتاح للطلاب والأساتذة الآخرين
          إمكانية رؤية سؤالك والإجابة عليه{" "}
        </p>
        <p
          className="text-center text-lg mt-1 w-1/2 mx-auto "
          style={{ fontSize: 17, fontWeight: "normal" }}
        >
          كخطوة أولى لإطلاق هذه الميزة نحتاج إلى جمع بعض أسئلتك الشائعة، بعد ذلك
          عندما نقوم بجمع عدد من الأسئلة مع إجاباتها سنجعل جميع الأسئلة متاحة
          للجميع مع إمكانية رؤية، إضافة والإجابة على الأسئلة الجديدة
        </p>

        <Link href="/collectQuestions">
          <button
            className="btn block mx-auto my-5 btn_answer px-5 py-2 "
            style={{ fontSize: 20 }}
          >
            اطرح سؤالك الآن
          </button>
        </Link>
      </div>
    );

  // Rendring Content
  if (isLoading)
    return (
      <div className="h-screen Questions_section">
        <QuestionsMenu data={questionsData}></QuestionsMenu>
        <div className="spinner-border block mx-auto mt-5" role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );
  if (!data) return <p>No profile data</p>;
  return (
    <div>
      <div className="Question_container py-3 px-2">
        <div className="Questions_section ">
          <QuestionsMenu data={questionsData}></QuestionsMenu>
          {data
            .map(
              (elem, key) =>
                IsOnCurrentPage(key) && (
                  <QuestionBox
                    key={elem._id}
                    id={elem._id}
                    Time={elem.createdAt}
                    user_photo={userPhotos[elem.creatorEmail]}
                    creator={elem.creator}
                    creatorEmail={elem.creatorEmail}
                    More_details={elem.More_details}
                    Question={elem.question}
                    tags={elem.tags}
                    number_of_answers={elem.answers.length}
                    number_of_likes={elem.sumNotes}
                    title={elem.title}
                    staticData={questionsData}
                    saved={elem.saved}
                    userNote={elem.userNote}
                  />
                )
            )}
          <NextPrevious
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            maxNumPages={maxNumPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;