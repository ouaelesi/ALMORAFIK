import React from "react";
import YoutubCard from "./YoutubCard";
import { useState } from "react";
import NextPrevious from "../NextPrevious";
import { useEffect } from "react";
import { getYoutubChannels_Service } from "../../services/ressources/youtubeChannels/index";
import Loader from "../base/Loader";
import { useRouter } from "next/router";

const YoutubResouces = () => {
  // locale

  const { locale } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [maxNumPages, setMaxNumPages] = useState(10);
  const [youtubChannels, setChannels] = useState(null);

  const getChannels = async () => {
    try {
      const response = await getYoutubChannels_Service();
      setChannels(response);
    } catch {}
  };

  // hooks
  useEffect(() => {
    !youtubChannels && getChannels();
  }, [youtubChannels]);
  return (
    <div>
      {youtubChannels ? (
        <div
          className={`d-flex gap-4 mt-4 ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          {youtubChannels.map((channel) => (
            <div key={channel._id} className="w-1/2">
              <YoutubCard data={channel}  />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-screen">
          <Loader />
        </div>
      )}
      <div className="mt-4">
        <NextPrevious
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          maxNumPages={maxNumPages}
        />
      </div>
    </div>
  );
};

export default YoutubResouces;
