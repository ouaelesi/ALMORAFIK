import React from "react";
import BookRessourcesCard from "./BookRessourceCard";
import NextPrevious from "../NextPrevious";
import { useState } from "react";
import { useEffect } from "react";
import { getBooks_Service } from "../../services/ressources/Books";
import { useRouter } from "next/router";
import Loader from "../base/Loader";

const BooksRessources = () => {
  // locale lang
  const { locale } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [maxNumPages, setMaxNumPAges] = useState(1);

  const [booksData, setData] = useState(null);

  // get books
  const getBooks = async () => {
    try {
      const response = await getBooks_Service();
      setData(response);
    } catch {}
  };

  useEffect(() => {
    !booksData && getBooks();
  }, [booksData]);
  return (
    <div>
      <div
        className={`row gap-y-4 mt-4 ${
          locale === "arab" ? "flex-row-reverse" : ""
        }`}
      >
        {" "}
        {booksData ? (
          booksData.map((channel) => (
            <div key={channel._id} className="col-md-6 col-12">
              <BookRessourcesCard data={channel} />
            </div>
          ))
        ) : (
          <div className="w-100 h-screen d-flex justify-center">
            <Loader />
          </div>
        )}
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
