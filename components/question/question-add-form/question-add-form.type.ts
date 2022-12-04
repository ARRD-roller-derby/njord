export type QuestionAddFormResults = {
    onChange: (key:'question'|'good_answers', value:string)=>void,
    deleteBad: (index: string)=>void,
    addBad: ()=>void,
    activeQuestion:(value:boolean)=>void,
    onChangeBadAnwser: (value:string, index:string) =>void,
    form: QuestionAddFormForm,
    loading: boolean,
    onSubmit: ()=>void,
    onCrop: (imageElement:any)=>void
    img: string
    submitFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cropperRef: any
}

export type QuestionAddFormForm = {
    question: string
    img?: string
    active:boolean
    good_answers: string
    bad_answers: Array<QuestionAddFormBadAnwser>
}

export type QuestionAddFormBadAnwser = {index: string,value:string}