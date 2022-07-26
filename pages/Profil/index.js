import React, { useState, useEffect, useContext } from "react";
import { getServerSideProps } from "../questions/[id]";
import AuthContext from "../../utils/AuthContext";
const Profil = () => {
  const [profilData, setProfilData] = useState("There Is No Data");
  const [isLoading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Profil Page cbn");
    setLoading(true);
    console.log("the user", user);
    if (!user) {
      fetch(`/api/users/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setProfilData(data);
          setLoading(false);
        })
        .catch((err) => console.log("there is an error", user));
    }
  }, []);

  if (isLoading)
    return (
      <div className="h-screen pt-20">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="p-20">
      <div className="bg-gray-200 rounded-md border-2 border-gray-300 p-10">
        <div>{profilData.email}</div>
        <div>{profilData.userName}</div>
      </div>
    </div>
  );
};

export default Profil;
