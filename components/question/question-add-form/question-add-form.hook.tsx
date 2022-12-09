import { useContext, useEffect, useRef, useState } from "react"
import { QuestionAddFormForm, QuestionAddFormResults } from "./question-add-form.type"
import { v4 as uuidv4 } from 'uuid';
import { getBase64 } from "../../../utils/getBase64";
import usePost from "../../_hooks/usePost";
import { FullscreenPopinContext } from "../../fullscreen-popin/fullscreen-popin.context";
import { QuestionsContext } from "../../_pageRelated/questions/question.context";

export const useQuestionsAddForm = (): QuestionAddFormResults => {
    const cropperRef = useRef(null),
        [img, setImg] = useState(), { close } = useContext(FullscreenPopinContext),
        [imgCropped, setimgCropped] = useState(),
        { data, loading, post } = usePost('question/add'),
        { refetch } = useContext(QuestionsContext)

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

    const onChange = (key: 'question' | 'good_answers' | 'img', value: string) => {
        setForm(prevState => ({ ...prevState, [key]: value }))
    }

    const activeQuestion = (value: boolean) => {
        setForm(prevState => ({ ...prevState, active: value }))
    }

    const addBad = () => {
        setForm(prevState => ({
            ...prevState,
            bad_answers: [...prevState.bad_answers, { index: uuidv4(), value: '' }]
        }
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
            ...prevState,
            bad_answers: prevState.bad_answers.filter(bad_answer => bad_answer.index !== index)
        }))
    }

    const delImg = () => {
        setImg(undefined)
    }

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        post({ ...form, bad_answers: form.bad_answers.map(bad_answer => bad_answer.value) })
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
        deleteBad,
        onCrop,
        addBad,
        onChangeBadAnwser,
        activeQuestion,
        loading,
        onSubmit,
        submitFile,
        img,
        cropperRef,
        addImg,
        delImg
    }
}