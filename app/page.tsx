"use client";
import StartButton from "@/components/Button";
import DropOptions from "@/components/DropDownOptions";
import useQuiz from "./store";

export default function Home() {
  const quizConfig = useQuiz((state) => state.config);
  const addNumberOfQuestion = useQuiz((state) => state.addNumberOfQuestion);

  console.log("here", quizConfig);

  return (
    <section className="flex flex-col justify-center items-center my-10">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-sky-400">
          Quizical
        </span>{" "}
        Get hooked on quizzes!!
      </h1>
      <section className="p-5 my-5 rounded-lg shadow-xl w-[80%]">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Number of Questions
          </label>
          <input
            type="number"
            onChange={(e) => addNumberOfQuestion(Number(e.target.value))}
            defaultValue={10}
            min={0}
            max={50}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
        </div>

        <div className="flex w-full flex-col justify-center items-center">
          <DropOptions />
          <StartButton />
        </div>
      </section>
    </section>
  );
}
