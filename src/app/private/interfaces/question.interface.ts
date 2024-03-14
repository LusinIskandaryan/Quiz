import { QuestionType } from "../enums";
import { Answer } from "./answer.interface";

export interface Question {
  id: string,
  question: string;
  type: QuestionType;
  value: number;
  answers: Answer[];
}