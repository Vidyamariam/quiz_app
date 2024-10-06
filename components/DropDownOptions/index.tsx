"use client";
import useQuiz from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { useEffect, useState } from "react";
type categoryType = {
  id: number;
  name: string;
};

const Type = ["boolean", "multiple"];
const Levels = ["easy", "medium", "hard"];

const DropOptions = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const addCategory = useQuiz((state) => state.addCategory);
  const addLevel = useQuiz((state) => state.addLevel);
  const addType = useQuiz((state) => state.addType);
  const quizConfig = useQuiz((state) => state.config);

  useEffect(() => {
    async function fetchCategory() {
      const { trivia_categories } = await (
        await fetch("https://opentdb.com/api_category.php")
      ).json();
      setCategories([...trivia_categories]);
    }
    fetchCategory();
  }, []);

  return (
    <section className="flex flex-wrap justify-evenly items-center py-5 w-full">
      <div className="px-4 py-4 w-full sm:w-1/2 lg:w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none w-full py-3 px-10 rounded-lg shadow-md hover:bg-violet-500 hover:text-gray-50">
            {" "}
            {quizConfig.category.name
              ? quizConfig.category.name
              : "CATEGORY"}{" "}
            <ChevronDown />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => addCategory(category.id, category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-4 w-full sm:w-1/2 lg:w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none w-full py-3 px-10 rounded-lg shadow-md hover:bg-violet-500 hover:text-gray-50">
            {quizConfig.level ? quizConfig.level : "SELECT LEVEL"}{" "}
            <ChevronDown />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Levels.map((level) => (
              <DropdownMenuItem onClick={() => addLevel(level)} key={level}>
                {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 py-4 w-full sm:w-1/2 lg:w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none w-full py-3 px-10 rounded-lg shadow-md hover:bg-violet-500 hover:text-gray-50">
            {quizConfig.type ? quizConfig.type : "SELECT TYPE"} <ChevronDown />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Type.map((type) => (
              <DropdownMenuItem onClick={() => addType(type)} key={type}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default DropOptions;
