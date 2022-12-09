import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import PageActions from '../../_ui/PageActions/PageActions';
import { QuestionsResults } from './questions.type';
import styles from './questions.module.css';
import { FullscreenPopin } from '../../fullscreen-popin/fullscreen-popin';
import { QuestionsAddForm } from '../../question/question-add-form/question-add-form';
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel';
import Pagination from '../../pagination/pagination';

export const QuestionsView: React.FC<QuestionsResults> = ({ questions, loading }) => {
    return <AuthentificatedLayout>
        <PageActions>
            <FullscreenPopin text="Ajouter une question">
                <QuestionsAddForm />
            </FullscreenPopin>


        </PageActions>

        <div className={styles.container}>
            {loading && <LoaderWheel />}

            <div className={styles.items}>
                {questions && questions.length === 0 && <div>Aucune question.</div>}
                {!loading && questions &&
                    <>

                        {questions.map((question) => (
                            <p key={question._id}>{question.question}</p>
                        ))}


                        <Pagination />
                    </>
                }
            </div>
        </div>
    </AuthentificatedLayout>
}