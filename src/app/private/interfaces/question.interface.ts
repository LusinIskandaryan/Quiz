import { QuestionType } from "../enums";
import { Answer } from "./answer.interface";

export interface Question {
  id: number,
  question: string;
  type: QuestionType;
  answers: Answer[];
}