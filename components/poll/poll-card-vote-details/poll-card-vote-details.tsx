import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IPoll } from '../../../types/poll.interface'
import { UserInterface } from '../../../types/User.interface'
import userNameRender from '../../../utils/userNameRender'
import useFetch from '../../_hooks/useFetch'
import Factory from '../../_layouts/Factory/Factory'
import styles from './poll-card-vote-details.module.css'
import validator from 'validator'

export interface PollCardVoteDetailsProps {
  poll: IPoll
}

export interface PollCardVoteDetailsResults {
  isAdmin: boolean
  voters: {
    id: string,
    vote: string,
    voter: UserInterface
  }[]
  show: boolean
  setShow: (value: boolean) => void
  loading: boolean
}

export const usePollCardVoteDetails = ({ poll }): PollCardVoteDetailsResults => {
  const
    [show, setShow] = useState<boolean>(false),
    { data: session } = useSession(),
    { data, loading, refetch } = useFetch<{
      voters: {
        id: string,
        vote: string,
        voter: UserInterface
      }[]
    }>('poll/vote_details', { pollId: poll._id });

  useEffect(() => {
    if (show && data) refetch()
  }, [show])

  return {
    voters: data?.voters || [],
    isAdmin: session?.user.admin,
    show, setShow,
    loading
  }
}

export const PollCardVoteDetailsView: React.FC<PollCardVoteDetailsProps & PollCardVoteDetailsResults> = ({ voters, show, setShow, isAdmin, loading }) => (
  isAdmin ? <div className={styles.container}>
    <div className={styles.header}>
      <button type='button' onClick={() => setShow(!show)}>{show ? 'Masquer détails' : 'Voir détails'}</button>
    </div>
    <div className={styles.body}>
      {loading && <div>Chargement...</div>}
      {show && <div className={styles.voters}>
        {voters.map((vote) => <div key={vote.id} className={styles.voter}>
          <div className={styles.voterName}>{userNameRender(vote.voter)}</div>
          <div className={styles.voterVote}>{validator.unescape(vote.vote)}</div>
        </div>)}
      </div>}
    </div>

  </div> : <></>
)

export const PollCardVoteDetails = Factory<PollCardVoteDetailsProps, PollCardVoteDetailsResults>(usePollCardVoteDetails, PollCardVoteDetailsView);	