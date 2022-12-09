import { createContext, Dispatch, SetStateAction } from 'react';
import { QuestionInterface } from '../../types/question.interface';

export const QuestionContext = createContext<
  [QuestionInterface, Dispatch<SetStateAction<QuestionInterface>>]>(null);
