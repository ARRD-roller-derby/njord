import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IPoll, IPollVote } from "../../../types/poll.interface";
import Factory from "../../_layouts/Factory/Factory";
import { PollCardResult } from "../poll-card-result/poll-card-result";
import { PollCard } from "../poll-card/poll-card";

interface PollCardProps {
  poll: IPoll;
}

interface PollCardResults {
  iHaveAllreadyVoted: boolean;
  seeResults: boolean;
  setSeeResults: (value: boolean) => void;

}

export const usePollCard = ({ poll }: PollCardProps): PollCardResults => {
  const [seeResults, setSeeResults] = useState<boolean>(false),
    { data: session } = useSession(),
    iHaveAllreadyVoted = poll.votes.some((vote: IPollVote) => vote.userId === session.user._id) || dayjs().diff(dayjs(poll.expireAt), 'day') > 0;

  return {
    iHaveAllreadyVoted,
    seeResults, setSeeResults
  }
}

export const PollCardSelectorView: React.FC<PollCardProps & PollCardResults> = ({ poll, iHaveAllreadyVoted, seeResults, setSeeResults }) => (iHaveAllreadyVoted || seeResults ? <PollCardResult poll={poll} hideResult={() => setSeeResults(false)} iHaveAllreadyVoted={iHaveAllreadyVoted} /> : <PollCard poll={poll} seeResult={() => setSeeResults(true)} />
)

export const PollCardSelector = Factory<PollCardProps, PollCardResults>(usePollCard, PollCardSelectorView);