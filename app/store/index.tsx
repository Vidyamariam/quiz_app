import { create } from "zustand";

export type configType = {
  numberOfQuestion: number;
  category: { id: number; name: string };
  level: string;
  type: string;
  status: string;
  score: number;
};

const defaultConfig = {
  numberOfQuestion: 10,
  category: {
    id: 0,
    name: "",
  },
  level: "",
  type: "",
  status: "",
  score: 0,
};

type QuizState = {
  config: configType;
  addLevel: (level: string) => void;
  addCategory: (id: number, name: string) => void;
  addNumberOfQuestion: (count: number) => void;
  addStatus: (type: string) => void;
  addType: (type: string) => void;
  addScore: (score: number) => void;
};

const useQuiz = create<QuizState>((set) => ({
  config: { ...defaultConfig },
  addLevel: (level: string) =>
    set((state) => ({
      config: { ...state.config, level: level },
    })),
  addCategory: (id: number, name: string) =>
    set((state) => ({
      config: { ...state.config, category: { id: id, name: name } },
    })),
  addNumberOfQuestion: (count: number) =>
    set((state) => ({
      config: { ...state.config, numberOfQuestion: count },
    })),
  addStatus: (status: string) =>
    set((state) => ({
      config: { ...state.config, status: status },
    })),
  addType: (type: string) =>
    set((state) => ({
      config: { ...state.config, type: type },
    })),
  addScore: () =>
    set((state) => ({
      config: { ...state.config, score: state.config.score + 1 },
    })),
}));

export default useQuiz;
