import Factory from "../../_layouts/Factory/Factory"
import { useQuestionsAddForm } from "./question-add-form.hook"
import { QuestionAddFormResults } from "./question-add-form.type"
import { QuestionAddFormView } from "./question-add-form.view"
import 'cropperjs/dist/cropper.css'

export const QuestionsAddForm = Factory<unknown, QuestionAddFormResults>(
    useQuestionsAddForm,
    QuestionAddFormView
)
