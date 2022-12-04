import { useRef, useState } from "react"
import { QuestionAddFormForm, QuestionAddFormResults } from "./question-add-form.type"
import { v4 as uuidv4 } from 'uuid';
import { getBase64 } from "../../../utils/getBase64";

export const useQuestionsAddForm = (): QuestionAddFormResults => {
    const [form, setForm] = useState<QuestionAddFormForm>({
        question: '',
        img: undefined,
        good_answers: '',
        active: true,
        bad_answers: [{
            index: uuidv4(),
            value: ''
        }],
    })

    const cropperRef = useRef(null)
    const [img, setImg] = useState()
    const [imgCropped, setimgCropped] = useState()

    const onChange = (key: 'question' | 'good_answers', value: string) => {
        setForm(prevState => ({ ...prevState, [key]: value }))
    }

    const activeQuestion = (value: boolean) => {
        setForm(prevState => ({ ...prevState, active: value }))
    }

    const addBad = () => {
        setForm(prevState => ({ ...prevState, bad_answers: [...prevState.bad_answers, { index: uuidv4(), value: '' }] }
        ))
    }

    const onChangeBadAnwser = (value: string, index: string) => {
        setForm(prevState => {
            const bad_answers = [...prevState.bad_answers]
            const indexArray = bad_answers.findIndex(bad_answer => bad_answer.index === index)
            bad_answers.splice(indexArray, 1, { index, value })
            return { ...prevState, bad_answers }
        })
    }

    const deleteBad = (index: string) => {
        setForm(prevState => ({
            ...prevState, bad_answers: prevState.bad_answers.filter(bad_answer => bad_answer.index !== index)
        }))
    }

    const onSubmit = () => {
        //TODO sub form
    }

    function onCrop() {
        const imageElement: any = cropperRef?.current
        const cropper: any = imageElement?.cropper

        setimgCropped(cropper
            .getCroppedCanvas()
            .toDataURL('image/wepb'))


    }

    console.log(imgCropped)

    async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target?.files?.[0]) {
            setImg(await getBase64(e.target.files[0]))
        }
    }

    return {
        form,
        onChange,
        deleteBad,
        onCrop,
        addBad,
        onChangeBadAnwser,
        activeQuestion,
        loading: false,
        onSubmit,
        submitFile,
        img,
        cropperRef
    }
}