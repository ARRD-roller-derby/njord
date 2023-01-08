import { useContext, useEffect, useRef, useState } from "react"
import { QuestionAddFormForm, QuestionAddFormResults } from "./question-add-form.type"
import { v4 as uuidv4 } from 'uuid';
import { getBase64 } from "../../../utils/getBase64";
import usePost from "../../_hooks/usePost";
import { FullscreenPopinContext } from "../../fullscreen-popin/fullscreen-popin.context";
import { QuestionsContext } from "../../_pageRelated/questions/question.context";
import { toast } from "react-toastify";

export const useQuestionsAddForm = (): QuestionAddFormResults => {
  const cropperRef = useRef(null),
    [img, setImg] = useState(), { close } = useContext(FullscreenPopinContext),
    [imgCropped, setimgCropped] = useState(),
    { data, loading, post } = usePost('question/add'),
    { refetch } = useContext(QuestionsContext)

  const [form, setForm] = useState<QuestionAddFormForm>({
    question: '',
    img: undefined,
    answers: [{
      index: uuidv4(),
      value: '',
      type: 'good'
    },
    {
      index: uuidv4(),
      value: '',
      type: 'bad'
    }
    ],
    good_answers: '',
    active: true,
    bad_answers: [{
      index: uuidv4(),
      value: ''
    }],
  })

  //TODO au moins une bonne réponse et une mauvaise réponse


  const onChange = (key: 'question' | 'good_answers' | 'img', value: string) => {
    setForm(prevState => ({ ...prevState, [key]: value }))
  }

  const activeQuestion = (value: boolean) => {
    setForm(prevState => ({ ...prevState, active: value }))
  }

  const addQuestion = (type: 'good' | 'bad') => {
    setForm(prevState => ({
      ...prevState,
      answers: [...prevState.answers, { index: uuidv4(), value: '', type }]
    }
    ))
  }


  const onChangeAnwser = (value: string, type: 'good' | 'bad', index: string) => {
    setForm(prevState => {
      const answers = [...prevState.answers]
      const indexArray = answers.findIndex(answer => answer.index === index)
      answers.splice(indexArray, 1, { index, value, type })
      return { ...prevState, answers }
    })
  }

  const deleteAnswer = (index: string) => {
    setForm(prevState => ({
      ...prevState,
      answers: prevState.answers.filter(answer => answer.index !== index)
    }))
  }

  const delImg = () => {
    setImg(undefined)
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (form.answers.filter(answer => answer.type === 'good').length < 1 || form.answers.filter(answer => answer.type === 'bad').length < 1) return toast.error('Au moins une bonne réponse et une mauvaise réponse')
    post({
      ...form, answers: form.answers.map(answer => ({
        type: answer.type,
        answer: answer.value,
      }))
    })
  }

  const addImg = () => {
    setForm(prevState => ({
      ...prevState, img: imgCropped
    }))

    setImg(undefined)
  }

  function onCrop() {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper

    setimgCropped(cropper
      .getCroppedCanvas()
      .toDataURL('image/wepb'))
  }
  async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      setImg(await getBase64(e.target.files[0]))
    }
  }

  useEffect(() => {
    if (data) {
      refetch()
      close()
    }
  }, [data])

  return {
    form,
    onChange,
    deleteAnswer,
    onCrop,
    addQuestion,
    activeQuestion,
    onChangeAnwser,
    loading,
    onSubmit,
    submitFile,
    img,
    cropperRef,
    addImg,
    delImg
  }
}