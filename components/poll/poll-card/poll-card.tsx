import { useContext, useEffect, useMemo, useState } from "react";
import { IPoll, IPollOption } from "../../../types/poll.interface";
import { PollsContext } from "../../_pageRelated/polls/polls";
import styles from "./poll-card.module.css";
import validator from "validator";
import Factory from "../../_layouts/Factory/Factory";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Info from "../../_ui/Info/Info";
import dayjs from "dayjs";
import SubmitButton from "../../_ui/SubmitButton/SubmitButton";
import usePost from "../../_hooks/usePost";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";

export type PollCardProps = {
  poll: IPoll;
  seeResult: () => void;
}

export type PollCardResults = {
  reSync: () => void;
  selected: string[];
  handleSelect: (option: IPollOption) => void;
  handleSubmit: () => void;
  loading: boolean;
  canPoll: boolean;
  deleteLoading: boolean;
  deletePoll: () => void;
  totalVotes: number;
}

export const usePollCard = ({ poll }: PollCardProps): PollCardResults => {
  const { reSync, data: { canPoll } } = useContext(PollsContext),
    [selected, setSelected] = useState<string[]>([]),
    { loading, post, data } = usePost('poll/vote'),
    { loading: deleteLoading, post: postDel, data: dataDel } = usePost('poll/delete'),
    totalVotes = useMemo(() => poll.votes.reduce(
      (acc, value) => {
        const voteMulti = acc.find(vote => vote.userId === value.userId)
        if (!voteMulti) {
          return [...acc, value]
        }
        return acc
      }
      , []).length, [poll.votes])

  const handleSelect = (option: IPollOption) => {

    if (poll.multiChoice === false) {
      setSelected([option.id]);
      return;
    }
    if (selected.includes(option.id)) {
      setSelected(selected.filter(id => id !== option.id));
    } else {
      setSelected([...selected, option.id]);
    }
  }

  const handleSubmit = () => {
    post({ pollId: poll._id, responses: selected })
  }

  const deletePoll = () => {
    postDel({ pollId: poll._id })
  }

  useEffect(() => {
    if (data || dataDel) {
      reSync()
    }
  }, [data, dataDel])

  return { reSync, selected, handleSelect, handleSubmit, loading, canPoll, deleteLoading, deletePoll, totalVotes };
}

export const PollCardView: React.FC<PollCardProps & PollCardResults> = ({ poll, seeResult, handleSelect, selected, handleSubmit, loading, canPoll, deletePoll, totalVotes, deleteLoading }) => (
  <div className={styles.container}>
    <div className={styles.question}>
      <ReactMarkdown>{validator.unescape(poll.description)}</ReactMarkdown>
    </div>
    <div className={styles.infos}>
      <Info>
        <p>{totalVotes} vote{totalVotes > 1 ? "s" : ""}</p>
        <p>Fin du sondage: {dayjs(dayjs(poll.expireAt).format("YYYY-MM-DD") +
          "T00:00.000").from(
            dayjs().format("YYYY-MM-DD") + "T00:00.000"
          )}</p>
        {poll.multiChoice && <p>Plusieurs réponses possibles </p>}
      </Info>
    </div>
    <div className={styles.options}>
      {poll.options.map((option: IPollOption) => (
        <div className={styles.option} key={option.id} data-good={selected.includes(option.id)} onClick={() => handleSelect(option)}>{validator.escape(option.text)}</div>))}
    </div>
    <div className={styles.buttons} data-canpoll={canPoll}>
      {canPoll && <AutoConfirmButton text="Supprimer le sondage" textConfirm="Je confirme" onClick={deletePoll} loading={deleteLoading} />}
      {canPoll && <AutoConfirmButton text="Voir les résultats" textConfirm="Je confirme" onClick={seeResult} />}
      <SubmitButton loading={loading} text="Envoyer" onClick={handleSubmit} disabled={selected.length === 0} />
    </div>
  </div>
)

export const PollCard = Factory<PollCardProps, PollCardResults>(usePollCard, PollCardView)