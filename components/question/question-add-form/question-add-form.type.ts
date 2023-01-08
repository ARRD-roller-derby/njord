import { IAnswer } from "../../../types/question.interface"

export type QuestionAddFormResults = {
  onChange: (key: 'question' | 'good_answers' | 'img', value: string) => void,
  deleteAnswer: (index: string) => void,
  addQuestion: (type: 'bad' | 'good') => void,
  activeQuestion: (value: boolean) => void,
  onChangeAnwser: (value: string, type: 'bad' | 'good', index: string) => void,
  form: QuestionAddFormForm,
  loading: boolean,
  onSubmit: (e: React.SyntheticEvent) => void,
  onCrop: (imageElement: any) => void
  img: string
  submitFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
  cropperRef: any,
  delImg: () => void,
  addImg: () => void,
}

export type QuestionAddFormForm = {
  question: string
  img?: string
  active: boolean
  good_answers: string
  answers: Anwser[]
  bad_answers: Array<QuestionAddFormBadAnwser>
}

export type QuestionAddFormBadAnwser = { index: string, value: string }
export type Anwser = { index: string, value: string, type: 'good' | 'bad' }