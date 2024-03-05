import { Question } from "./question.interface";

export interface Quiz {
  id: string,
  name: string;
  timer: number;
  passValue: number;
  result?: number;
  questions: Question[];
}