import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { useState } from "react";

const QuestionAdded = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add an event listener to the window to update the size when it changes.
    window.addEventListener("resize", handleResize);

    // Initial size
    handleResize();

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen">
      {windowSize.width && (
        <Confetti
          width={windowSize ? windowSize.width : 1300}
          height={windowSize ? windowSize.height : 900}
          colors={["#fcc125", "#1e96fc", "#0075dc", "#ecc600"]}
          tweenDuration={5000}
        />
      )}
      <Tilt tiltReverse>
        <div className="md:w-1/4 w-10/12 mx-auto">
          <Image
            src="/assets/imgs/successillustration.svg"
            width="200"
            height="200"
            alt="almorafiq success image"
            className="block mx-auto mt-20 w-100 cursor-pointer"
          />
        </div>
      </Tilt>

      <p
        className="text-center text-lg mt-4  "
        style={{ fontSize: 35, fontWeight: "bold" }}
      >
        تمت إضافة سؤالك بنجاح
      </p>
      <p
        className="text-center text-lg mt-2 "
        style={{ fontSize: 20, fontWeight: "normal" }}
      >
        سوف نتواصل معك بمجرد نشر الأسئلة
      </p>
      <div className="w-10/12 md:w-1/4 mx-auto">
        <Link href="/" className="w-full">
          <button
            className="btn w-100 block  my-5 btn_answer px-5 py-2 "
            style={{ fontSize: 15 }}
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionAdded;
