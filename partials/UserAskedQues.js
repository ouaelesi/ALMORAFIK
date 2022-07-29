import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../utils/AuthContext";

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
    return <div>You didn t ask any question yet </div>;
  }
  return (
    <div>
      <div>Your Asked Questions</div>
      {data.map((ques, key) => (
        <div key={key}>{ques.question}</div>
      ))}
    </div>
  );
};

export default UserAskedQues;
