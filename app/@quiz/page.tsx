"use client";
import React, { useEffect, useState } from "react";
import useQuiz from "../store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@lottiefiles/react-lottie-player";

function Quiz() {
  const [questions, setQuestions] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const config = useQuiz((state) => state.config);
  const addScore = useQuiz((state) => state.addScore);

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        );

        const data = await response.json();

        // console.log(results);
        const shuffledResult: any = data.results.map(
          (e: { incorrect_answers: any; correct_answer: any }) => {
            const answers = [...e.incorrect_answers, e.correct_answer]
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
            return {
              ...e,
              answers: answers,
            };
          }
        );
        setQuestions([...shuffledResult]);
        setLoading(false);
        console.log("sfgg", shuffledResult);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    getQuestions();
  }, [config.numberOfQuestion, config.category.id, config.level, config.type]);

  const handleNext = () => {
    const remaningQuestions = [...questions];
    remaningQuestions.shift();
    setQuestions([...remaningQuestions]);
    setAnswer("");
  };

  const checkAnswer = (answer: string) => {
    if (answer === questions[0].correct_answer) {
      addScore(0);
    }
    setAnswer(questions[0].correct_answer);
  };

  return (
    <section className="flex flex-col justify-center items-center mt-10">
      {questions.length ? (
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question Number{" "}
          {questions?.length ? (
            <span className="text-violet-600 dark:text-violet-500">
              # {config.numberOfQuestion - questions?.length + 1}
            </span>
          ) : null}
        </h1>
      ) : null}
      {!loading && !!questions.length && (
        <p className="text-2xl">Score: {config.score}</p>
      )}

      <section className="shadow-2xl my-5 p-5 w-[90%] flex flex-col justify-center items-center shadow-violet-400 ">
        <h4 className="mb-4 text-3xl text-center font-extrabold text-violet-600 dark:text-violet-500 md:text-5xl lg:text-4xl">
          {questions.length ? questions[0].question : null}
        </h4>

        {loading && (
          <div className="flex flex-col">
            <Skeleton className="w-[600px] h-[60px] my-6 rounded-sm" />
            <Skeleton className="w-[600px] h-[500px] rounded-sm" />
          </div>
        )}

        {!questions.length && !loading && (
          <div className="flex flex-col justify-center items-center">
            <Player
              src="https://lottie.host/c6320dac-f58f-4749-a8d7-a61e474fca25/RNrja3mzqx.json"
              className="player"
              loop
              autoplay
              style={{ height: "300px", width: "300px" }}
            />
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              YOUR SCORE : {config.score}
            </h1>
          </div>
        )}

        {!questions.length ? (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-[40%] focus:outline-none  border-grey-200 bg-purple-500 shadow-xl hover:text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 mb-2  "
          >
            Take another quiz
          </button>
        ) : null}

        <div className="flex justify-evenly items-center my-20 flex-wrap w-[90%] mt-10">
          {questions.length
            ? questions[0].answers.map((ans: any) => (
                <button
                  type="button"
                  key={ans}
                  onClick={() => checkAnswer(ans)}
                  className={cn(
                    "w-[40%] focus:outline border-grey-200 shadow-xl hover:text-white hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-4 py-2.5 mb-2 ",
                    {
                      "bg-red-600": answer && ans !== answer,
                      "bg-green-600": answer && ans === answer,
                      "hover:bg-red-600": answer && ans !== answer,
                      "hover:bg-green-600": answer && ans === answer,
                      "text-gray-100": answer,
                    }
                  )}
                >
                  {ans}
                </button>
              ))
            : null}
        </div>

        {questions.length ? (
          <button
            type="button"
            onClick={() => handleNext()}
            className="w-[40%] focus:outline-none  border-grey-200 shadow-xl hover:text-white hover:bg-purple-900 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 mb-2  "
          >
            Next
          </button>
        ) : null}
      </section>
    </section>
  );
}

export default Quiz;
