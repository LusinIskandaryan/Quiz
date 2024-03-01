import { Question } from "./question.interface";

export interface Quiz {
  id: string,
  name: string;
  timer: number;
  passWalue: number;
  result?: number;
  questions: Question[];
}