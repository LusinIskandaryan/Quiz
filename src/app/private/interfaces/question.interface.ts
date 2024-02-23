import { AnswerType } from "../enums";
import { Answer } from "./answer.interface";

export interface Question {
  id: number,
  name: string;
  type: AnswerType;
  answers: Answer[];
}