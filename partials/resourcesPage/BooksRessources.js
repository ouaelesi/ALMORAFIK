import React from "react";
import BookRessourcesCard from "./BookRessourceCard";
import NextPrevious from "../NextPrevious";
import { useState } from "react";

const BooksRessources = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxNumPages, setMaxNumPAges] = useState(1);

  const data = [
    {
      _id: 1,
      image: "/assets/imgs/mathbook.png",
      title: "Bac MATH",
      author: "@ouaelsahbi",

      description:
        "This a description of the channle it can be anything it can be anything, its just a random text tused in the desgin",
      tags: ["Math", "Bac"],
    },
    {
      _id: 2,
      image: "/assets/imgs/mathbook.png",
      title: "Ouael SAHBI",
      author: "@ouaelsahbi",

      description:
        "This a description of the channle it can be anything it can be anything, its just a random text tused in the desgin",
      tags: ["Math", "Bac"],
    },
    {
      _id: 3,
      image: "/assets/imgs/mathbook.png",
      title: "Ouael SAHBI",
      author: "@ouaelsahbi",

      description:
        "This a description of the channle it can be anything it can be anything, its just a random text tused in the desgin",
      tags: ["Math", "Bac"],
    },
    {
      _id: 1,
      image: "/assets/imgs/mathbook.png",
      title: "Ouael SAHBI",
      author: "@ouaelsahbi",

      description:
        "This a description of the channle it can be anything it can be anything, its just a random text tused in the desgin",
      tags: ["Math", "Bac"],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((channel) => (
          <BookRessourcesCard data={channel} key={channel._id} />
        ))}
      </div>
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

export default BooksRessources;
