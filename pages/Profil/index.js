import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import UserAskedQues from "../../partials/UserAskedQues";
import UserSavedQuestions from "../../partials/UserSavedQuestions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileStaticData } from "../../data/TemporaryData/staticData/eng/profileStaticData";
import { profileStaticDataAr } from "../../data/TemporaryData/staticData/arab/profileStaticDataAr";

import {
  faPen,
  faEnvelope,
  faUser,
  faComment,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Profil = () => {
  const { locale } = useRouter();

  const [profilData, setProfilData] = useState("There Is No Data");
  const [isLoading, setLoading] = useState(true);
  // To Open the update password section
  const [pswSecIsOpen, setPSWsection] = useState(false);
  // To Update the user Profil
  const [updatedProfilData, setUpdateProfil] = useState();
  // To Update the user Profil
  const [updatedProfilPhoto, setUpdateProfilPhoto] = useState(null);

  const [profileTablerData, setProfileTablerData] = useState([
    {
      name: profileStaticDataAr.tabs.myQuestions,
      icon: faComment,
      component: UserAskedQues,
    },
    {
      name: profileStaticDataAr.tabs.mySaves,
      icon: faBookmark,
      component: UserSavedQuestions,
    },
  ]);

  const [activeTab, setTab] = useState(profileTablerData[0]);

  const [staticData, setStaticData] = useState(profileStaticDataAr);

  // infos of the Auth user
  const { user } = useContext(AuthContext);
  // icons

  useEffect(() => {
    setLoading(true);

    if (user) {
      fetch(`/api/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfilData(data);
          setUpdateProfil(data);
          setLoading(false);
        })
        .catch((err) => console.log("there is an error", user));
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    locale === "arab"
      ? setStaticData(profileStaticDataAr)
      : setStaticData(profileStaticData);
  }, [locale]);

  const changeProfilPhoto = () => {
    const imgInput = document.getElementById("img");
    const formData = new FormData();

    formData.append("theFiles", imgInput.files[0]);

    fetch(`/api/upload/${user.email}`, {
      method: "POST",

      body: formData,
    })
      .then(() => console.log("We have changed Your Profil Pic"))
      .catch((err) =>
        console.log("there is an error when changing the profil photo of", user)
      );
  };
  const handleP = (e) => {};
  if (isLoading)
    return (
      <div className=" pt-20">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div
      className={`bg-light ${locale === "arab" ? "text-end" : "text-start"}`}
    >
      <div className=" px-md-5 px-4 py-md-10 py-4 Questions_section ">
        <div className="row gap-2 bg-white px-md-5 px-3 py-4 rounded-xl border border-secondary shadow justify-content-between ">
          <div className="alert alert-warning  " role="alert">
            {staticData.alert}
          </div>
          <div className="QuestionTitle mb-4">{staticData.title}</div>
          <div
            className={`col-md-5  ${locale === "arab" ? "order-2" : "order-1"}`}
          >
            <div className="bg-dark  w-1/3 rounded-full">
              {profilData.profilPic && !updatedProfilPhoto && (
                <img src={profilData.profilPic} widht="200"></img>
              )}
            </div>
            <div className="bg-dark  w-1/3 rounded-full">
              {updatedProfilPhoto && (
                <img
                  src={URL.createObjectURL(updatedProfilPhoto)}
                  widht="200"
                ></img>
              )}
            </div>

            <form onSubmit={changeProfilPhoto}>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => handleP(e)}
              />
              <button
                type="submit"
                className="px-2 rounded-md border-2 border-dark my-3"
              >
                {staticData.changePhoto}
              </button>
            </form>
          </div>

          <form
            className={`col-md-5  w-md-5/12   ${
              locale === "arab" ? "order-1" : "order-2"
            }`}
          >
            <div
              className={`d-flex gap-3  ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  marginTop: "5",
                  fontSize: "15",
                  marginRight: 5,
                  marginLeft: -7,
                }}
              />
              {staticData.userName}
            </div>

            <div
              className={`d-flex gap-3  mb-4  ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <input
                defaultValue={profilData.userName}
                className="form-control col"
              ></input>
              <button className="btn  col-1">
                {" "}
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ marginTop: "5", fontSize: "20" }}
                />
              </button>
            </div>
            <div
              className={`d-flex gap-3  ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{
                  marginTop: "5",
                  fontSize: "15",
                  marginRight: 5,
                  marginLeft: -7,
                }}
              />
              {staticData.email}
            </div>
            <div
              className={`d-flex gap-3  mb-4  ${
                locale === "arab" ? "flex-row-reverse" : ""
              }`}
            >
              <input
                defaultValue={profilData.email}
                className="form-control col w-8/12"
              ></input>
              <button className="btn  col-1">
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ marginTop: "5", fontSize: "20" }}
                />
              </button>
            </div>
            {!pswSecIsOpen && (
              <div
                className="mb-4 underline cursor-pointer"
                onClick={() => setPSWsection(true)}
              >
                {staticData.editPassword}
              </div>
            )}
            {pswSecIsOpen && (
              <div>
                <button
                  className="float-right"
                  onClick={() => setPSWsection(false)}
                >
                  X
                </button>
                Current Password
                <div className="row gap-2 mb-4">
                  <input
                    type="password"
                    className="form-control col w-8/12"
                  ></input>
                </div>
                New password
                <div className="row gap-2 mb-4">
                  <input
                    type="password"
                    placeholder="Set a new password"
                    className="form-control col w-8/12"
                  ></input>
                </div>
              </div>
            )}
            <button className="btn ask_btn float-right">
              {staticData.save}
            </button>
          </form>
        </div>

        <div
          className={`d-flex mt-8 w-fit  p-1 border-2 rounded-md ${
            locale === "arab" ? "flex-row-reverse ml-auto" : "" 
          }`}
        >
          {profileTablerData.map((tab, key) => (
            <div
              key={key}
              className={`${
                tab.name === activeTab.name
                  ? "text-white bg-yellow-color fw-semibold"
                  : ""
              }
              cursor-pointer hover-text-warning px-4 py-2 rounded-md d-flex gap-2`}
              onClick={() => setTab(tab)}
            >
              {" "}
              <FontAwesomeIcon
                icon={tab.icon}
                style={{ marginTop: "4", fontSize: "16" }}
              />{" "}
              {tab.name}
            </div>
          ))}
        </div>
        {<activeTab.component />}
      </div>
    </div>
  );
};

export default Profil;
