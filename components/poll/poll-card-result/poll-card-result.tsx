import { useContext, useEffect, useMemo } from "react";
import { IPoll, IPollOption } from "../../../types/poll.interface";
import { PollsContext } from "../../_pageRelated/polls/polls";
import styles from "./poll-card-result.module.css";
import validator from "validator";
import Factory from "../../_layouts/Factory/Factory";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Info from "../../_ui/Info/Info";
import dayjs from "dayjs";
import usePost from "../../_hooks/usePost";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import { percent } from "../../../utils/percent";

export type PollCardResultProps = {
  poll: IPoll;
  hideResult: () => void;
  iHaveAllreadyVoted: boolean;
}

export type PollCardResultResults = {
  reSync: () => void;
  canPoll: boolean;
  deleteLoading: boolean;
  deletePoll: () => void;
  options: {
    id: string;
    text: string;
    votes: number;
  }[]
  totalVotes: number;
  totalVotesByOption: number;
}

export const usePollCardResult = ({ poll }: PollCardResultProps): PollCardResultResults => {
  const { reSync, data: { canPoll } } = useContext(PollsContext),
    { loading: deleteLoading, post: postDel, data: dataDel } = usePost('poll/delete')

  const options = useMemo(() => {

    return poll.options.map((option) => {
      return {
        ...option,
        votes: poll.votes.filter((vote) => vote.optionId === option.id).length
      }
    }).sort((a, b) => b.votes - a.votes)
  }
    , [poll.votes]),
    totalVotes = useMemo(() => poll.votes.reduce(
      (acc, value) => {
        const voteMulti = acc.find(vote => vote.userId === value.userId)
        if (!voteMulti) {
          return [...acc, value]
        }
        return acc
      }
      , []).length, [poll.votes]),
    totalVotesByOption = useMemo(() => options.reduce((acc, option) => acc + option.votes, 0), [options])

  const deletePoll = () => {
    postDel({ pollId: poll._id })
  }

  useEffect(() => {
    if (dataDel) {
      reSync()
    }
  }, [dataDel])

  return { reSync, canPoll, deleteLoading, deletePoll, options, totalVotes, totalVotesByOption };
}

export const PollCardResultView: React.FC<PollCardResultProps & PollCardResultResults> = ({ poll, canPoll, deletePoll, deleteLoading, options, totalVotes, hideResult, iHaveAllreadyVoted, totalVotesByOption }) => (
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
      </Info>
    </div>
    <div className={styles.options}>
      {options.map((option) => {

        const percentVal = percent(option.votes, totalVotesByOption)

        return (<div key={option.id} className={styles.option} >
          <div className={styles.optionBar} style={{ width: percentVal + "%" }} />
          {validator.unescape(option.text)} <span className={styles.result}>({option.votes} votes, {percentVal}%)</span>
        </div>)
      })}

    </div>
    <div className={styles.buttons} data-canpoll={canPoll}>
      {canPoll && <AutoConfirmButton text="Supprimer le sondage" textConfirm="Je confirme" onClick={deletePoll} loading={deleteLoading} />}
      {canPoll && !iHaveAllreadyVoted && <AutoConfirmButton text="Voter" textConfirm="Je confirme" onClick={hideResult} />}
    </div>
  </div>
)

export const PollCardResult = Factory<PollCardResultProps, PollCardResultResults>(usePollCardResult, PollCardResultView)