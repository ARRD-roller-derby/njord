import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import PageActions from '../../_ui/PageActions/PageActions';
import { QuestionsResults } from './questions.type';
import styles from './questions.module.css';
import { FullscreenPopin } from '../../fullscreen-popin/fullscreen-popin';
import { QuestionsAddForm } from '../../question/question-add-form/question-add-form';

export const QuestionsView: React.FC<QuestionsResults> = () => {
    return <AuthentificatedLayout>
        <PageActions>
            <FullscreenPopin text="Ajouter une question">
                <QuestionsAddForm />
            </FullscreenPopin>

        </PageActions>
        <p>Ma page questions</p>
        <p>Un filtre</p>
        <p>Les questions</p>
    </AuthentificatedLayout>
}