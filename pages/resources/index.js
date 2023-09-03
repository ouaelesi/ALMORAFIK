import React, { useState } from "react";
import YoutubCard from "../../partials/resourcesPage/YoutubCard";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBook, faGlobe } from "@fortawesome/free-solid-svg-icons";
import YoutubResources from "../../partials/resourcesPage/YoutubResouces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import BooksRessources from "../../partials/resourcesPage/BooksRessources";
const Resources = () => {
  const locale = useRouter();

  const Not=  ()=>{
    return <div className="text-center my-4">Not available yet</div>
  }
  const [profileTablerData, setProfileTablerData] = useState([
    {
      name: "Youtube Channels",
      icon: faYoutube,
      component: YoutubResources,
    },
    {
      name: "Best Books",
      icon: faBook,
      component: BooksRessources,
    },
    {
      name: "Media Pages",
      icon: faGlobe,
      component: Not,
    },
  ]);

  const [activeTab, setTab] = useState(profileTablerData[0]);

  return (
    <div className="Question_container">
      <div className="h-screen Questions_section  py-3">
        <div className="px-md-5 px-3   py-5   QuestionMenu  border-2 border-light text-white fs-2 ">
          the resources page
        </div>
        <div
          className={`d-flex mt-4 w-fit  p-1 border-2 rounded-md bg-light ${
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

export default Resources;