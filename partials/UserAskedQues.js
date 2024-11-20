import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import ProfilQuesBox from "./ProfilQuesBox";
import QuestionBox from "./QuestionBox";
import { questionsArData } from "../data/TemporaryData/staticData/arab/questionsPage";
import { questionsEngData } from "../data/TemporaryData/staticData/eng/questionsPage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const UserAskedQues = () => {
  const { locale } = useRouter();

  // state
  const [questionsData, setQuestionsData] = useState(questionsArData);

  // const { user } = useContext(AuthContext);
  const {data:session}= useSession()
  const user = session?.user;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`/api/users/questions/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

  if (isLoading) {
    return (
      <div className="spinner-border block mx-auto" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="bg-white p-5 rounded-xl border-2 QuestionTitle">
        You didn t ask any question yet
      </div>
    );
  }
  return (
    <div className=" pb-4  rounded-xl  ">
      {/* <div className="QuestionTitle fs-2 fw-bolder bg-light border border-light px-3 py-3 ">
        Your Asked Questions
        <hr />
      </div> */}

      {data.map((elem, key) => (
        <QuestionBox
          key={key}
          id={elem._id}
          Time={elem.createdAt}
          user_photo={elem.user_photo}
          creator={elem.creator}
          creatorEmail={elem.creatorEmail}
          More_details={elem.More_details}
          Question={elem.question}
          tags={elem.tags}
          number_of_answers={elem.answers.length}
          number_of_likes={elem.likeCount}
          title={elem.title}
          staticData={questionsData}
        />
      ))}
    </div>
  );
};

export default UserAskedQues;
