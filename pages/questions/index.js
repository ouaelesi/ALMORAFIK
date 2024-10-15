import React, { useState, useEffect, useRef, useCallback } from "react";
import QuestionsMenu from "../../partials/QuestionsMenu";
import QuestionBox from "../../partials/QuestionBox";
import fetch from "isomorphic-unfetch";
import { questionsArData, questionsEngData } from "../../data/TemporaryData/staticData/arab/questionsPage";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const Questions = () => {
  const [questionsLaunched, launchQuestions] = useState(true);
  const { locale } = useRouter();

  // State
  const [questionsData, setQuestionsData] = useState(questionsArData);
  const [userPhotos, setUserPhotos] = useState({});
  const [data, setData] = useState([]); // All fetched questions
  const [isLoading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // Initial number of questions to display
  const [hasMore, setHasMore] = useState(true); // To track if more questions are available
  const [seenQuestions, setSeenQuestions] = useState(new Set()); // Track seen questions
  const observer = useRef();
  const visibilityTimers = useRef({});

  useEffect(() => {
    // Update questions data based on locale
    locale === "arab"
      ? setQuestionsData(questionsArData)
      : setQuestionsData(questionsEngData);
  }, [locale]);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const fetchedData = await res.json();
        setData(fetchedData);
        setLoading(false);
        fetchUserPhotos(fetchedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUserPhotos = async (questions) => {
    const userEmails = questions.map((question) => question.creatorEmail);
    const uniqueUserEmails = [...new Set(userEmails)];
    const userPhotosData = {};

    await Promise.all(
      uniqueUserEmails.map(async (email) => {
        try {
          const res = await fetch(`/api/users/${email}`);
          if (res.ok) {
            const userData = await res.json();
            userPhotosData[email] = userData.photo;
          } else {
            userPhotosData[email] = "/default-user-photo.png"; // Fallback photo
          }
        } catch (error) {
          console.error(`Error fetching photo for user ${email}:`, error);
          userPhotosData[email] = "/default-user-photo.png"; // Fallback photo on error
        }
      })
    );

    setUserPhotos(userPhotosData);
  };

  // Infinite Scroll Function
  const lastQuestionRef = useCallback(
    (node) => {
      if (isLoading) return; // Do not observe if currently loading
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Load more questions when the sentinel is visible
          setVisibleCount((prevCount) => {
            const newCount = prevCount + 5;
            if (newCount >= data.length) {
              setHasMore(false); // No more questions to load
              return data.length;
            }
            return newCount;
          });
        }
      });

      if (node) observer.current.observe(node); // Observe the new node
    },
    [isLoading, hasMore, data.length]
  );

  const questionRef = useCallback(
    (node, id, title) => {
      if (isLoading) return; // Do not observe if currently loading
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start a timer when the question enters the viewport
            visibilityTimers.current[id] = setTimeout(() => {
              setSeenQuestions(prevSeenQuestions => {
                const newSeenQuestions = new Set(prevSeenQuestions).add(id);
                console.log(`Question viewed: ${title}`); 
                return newSeenQuestions;
              });
            }, 1000);
          } else {
            // Clear the timer if the question leaves the viewport before 2 seconds
            clearTimeout(visibilityTimers.current[id]);
          }
        });
      });

      if (node) observer.current.observe(node); // Observe the new node
    },
    [isLoading]
  );

  // Handle questions launched state
  if (!questionsLaunched)
    return (
      <div className="h-screen">
        <Tilt tiltReverse>
          <div className="w-1/4 mx-auto">
            <Image
              src="/assets/imgs/questionsillustration.svg"
              width="200"
              height="200"
              alt="Almorafiq success image"
              className="block mx-auto mt-20 w-100 cursor-pointer"
            />
          </div>
        </Tilt>

        <p
          className="text-center text-lg mt-4"
          style={{ fontSize: 35, fontWeight: "bold" }}
        >
          مرحبا بك في فضاء الأسئلة
        </p>
        <p
          className="text-center text-lg mt-4 w-1/2 mx-auto"
          style={{ fontSize: 20, fontWeight: "normal" }}
        >
          في هذه المساحة، يمكنك طرح أسئلتك وسيتاح للطلاب والأساتذة الآخرين
          إمكانية رؤية سؤالك والإجابة عليه
        </p>
        <p
          className="text-center text-lg mt-1 w-1/2 mx-auto"
          style={{ fontSize: 17, fontWeight: "normal" }}
        >
          كخطوة أولى لإطلاق هذه الميزة نحتاج إلى جمع بعض أسئلتك الشائعة، بعد ذلك
          عندما نقوم بجمع عدد من الأسئلة مع إجاباتها سنجعل جميع الأسئلة متاحة
          للجميع مع إمكانية رؤية، إضافة والإجابة على الأسئلة الجديدة
        </p>

        <Link href="/collectQuestions">
          <button
            className="btn block mx-auto my-5 btn_answer px-5 py-2"
            style={{ fontSize: 20 }}
          >
            اطرح سؤالك الآن
          </button>
        </Link>
      </div>
    );

  // Loading state when fetching initial data
  if (isLoading && data.length === 0)
    return (
      <div className="h-screen Questions_section">
        <QuestionsMenu data={questionsData}></QuestionsMenu>
        <div className="spinner-border block mx-auto mt-5" role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );

  // Handle case when no data is available
  if (!data.length) return <p>No questions available.</p>;

  // Slice the data based on visibleCount
  const visibleQuestions = data.slice(0, visibleCount);

  return (
    <div>
      <div className="Question_container py-3 px-2">
        <div className="Questions_section ">
          <QuestionsMenu data={questionsData}></QuestionsMenu>
          {visibleQuestions.map((elem, index) => {
            const questionElement = (
              <QuestionBox
                key={elem._id}
                id={elem._id}
                Time={elem.createdAt}
                user_photo={userPhotos[elem.creatorEmail]}
                creator={elem.creator}
                creatorEmail={elem.creatorEmail}
                More_details={elem.More_details}
                Question={elem.question}
                tags={elem.tags}
                number_of_answers={elem.answers.length}
                number_of_likes={elem.sumNotes}
                title={elem.title}
                staticData={questionsData}
                saved={elem.saved}
                userNote={elem.userNote}
              />
            );

            if (index === visibleQuestions.length - 1) {
              // Attach the ref to the last question element
              return (
                <div ref={node => lastQuestionRef(node)} key={elem._id}>
                  <div ref={node => questionRef(node, elem._id, elem.title)}>
                    {questionElement}
                  </div>
                </div>
              );
            } else {
              return (
                <div ref={node => questionRef(node, elem._id, elem.title)} key={elem._id}>
                  {questionElement}
                </div>
              );
            }
          })}
          {isLoading && <div className="text-center my-4">Loading more questions...</div>}
          {!hasMore && (
            <p className="text-center my-4">You have reached the end of the questions.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;