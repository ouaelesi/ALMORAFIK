import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const NextPrevious = ({ setCurrentPage, currentPage, maxNumPages }) => {
  return (
    <>
      <div className="pagination py-3">
        {
          <button
            className="previous btn "
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        }
        <div className="btn underline">
          Page {currentPage + 1}/{maxNumPages}
        </div>
        {
          <button
            className="Next btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage + 1 === maxNumPages}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        }
      </div>
    </>
  );
};

export default NextPrevious;
