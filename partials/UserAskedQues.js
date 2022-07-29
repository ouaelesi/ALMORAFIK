import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";
import ProfilQuesBox from "./ProfilQuesBox";

const UserAskedQues = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch("/api/questions")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [user]);
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
    <div className="bg-white py-4  rounded-xl px-5 border-2">
      <div className="QuestionTitle ">Your Asked Questions</div>
      {data.map((ques, key) => (
        <ProfilQuesBox QuestionData={ques} key={key} />
      ))}
    </div>
  );
};

export default UserAskedQues;
