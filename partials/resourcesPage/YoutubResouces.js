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
          className={`row gap-y-4 justify-between  mt-4 ${
            locale === "arab" ? "flex-row-reverse" : ""
          }`}
        >
          {youtubChannels.map((channel, index) => (
            <div
              key={channel._id}
              className={`col-md-6 col-12 ${index % 2 === 0 ? "order-2" : "order-1"}`}
              
            >
              {/* 'order-2' and 'order-1' classes are used to change the order of items on every second row */}
              <YoutubCard data={channel} />
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
