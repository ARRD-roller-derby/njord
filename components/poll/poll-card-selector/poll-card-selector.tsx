import { useSession } from "next-auth/react";
import { IPoll, IPollVote } from "../../../types/poll.interface";
import Factory from "../../_layouts/Factory/Factory";
import { PollCardResult } from "../poll-card-result/poll-card-result";
import { PollCard } from "../poll-card/poll-card";

interface PollCardProps {
  poll: IPoll;
}

interface PollCardResults {
  iHaveAllreadyVoted: boolean;

}

export const usePollCard = ({ poll }: PollCardProps): PollCardResults => {
  const { data: session } = useSession(),
    iHaveAllreadyVoted = poll.votes.some((vote: IPollVote) => vote.userId === session.user._id);

  return {
    iHaveAllreadyVoted
  }
}

export const PollCardSelectorView: React.FC<PollCardProps & PollCardResults> = ({ poll, iHaveAllreadyVoted }) => (iHaveAllreadyVoted ? <PollCardResult poll={poll} /> : <PollCard poll={poll} />
)

export const PollCardSelector = Factory<PollCardProps, PollCardResults>(usePollCard, PollCardSelectorView);