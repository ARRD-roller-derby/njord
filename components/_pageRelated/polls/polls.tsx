import { IPoll } from '../../../types/poll.interface'
import { createContext, useContext } from "react";
import styles from './polls.module.css'
import useFetch from '../../_hooks/useFetch';
import { usePaginationSetter } from '../../pagination/pagination.hook';
import { TriggerEvents } from '../../../types/trigger-events.enum';
import { PaginationContext } from '../../pagination/pagination.context';
import { Fetch } from '../../../types/fetch.interface';
import { useSocketTrigger } from '../../_hooks/socket-trigger.hook';
import { PaginationProvider } from '../../pagination/pagination.provider';
import Factory from '../../_layouts/Factory/Factory';
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import PageActions from '../../_ui/PageActions/PageActions';
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel';
import Pagination from '../../pagination/pagination';
import { FullscreenPopin } from '../../fullscreen-popin/fullscreen-popin';
import { PollForm } from '../../poll/poll-form/poll-form';
import { PollCardSelector } from '../../poll/poll-card-selector/poll-card-selector';

// TYPES --------------------------------------------
export type PollResult = {
  polls: IPoll[]
  loading: boolean
  canPoll: boolean
}

export type IPollContext = Fetch<{ polls: IPoll[], canPoll: boolean, page: number, totalPage: number }>

// CONTEXT ------------------------------------------
export const PollsContext = createContext(null);

// HOOK ---------------------------------------------
export const usePolls = (): PollResult => {
  const ctx = useContext(PollsContext),
    { data, loading } = ctx,
    { pagination } = useContext(PaginationContext)

  usePaginationSetter(ctx)
  useSocketTrigger(TriggerEvents.polls, () => {
    ctx.reSync({ page: pagination.currentPage })
  })

  return {
    polls: data?.polls,
    loading,
    canPoll: data?.canPoll,
  }
}

// COMPONENT ----------------------------------------
export const PollView: React.FC<PollResult> = ({ canPoll, loading, polls }) => (
  <AuthentificatedLayout>
    <h2>Sondages</h2>
    <PageActions>
      {canPoll && <FullscreenPopin text="Ajouter un sondage">
        <PollForm />
      </FullscreenPopin>}
    </PageActions>
    <div className={styles.container}>

      {loading && <LoaderWheel />}

      <div className={styles.polls}>
        {polls && polls.length === 0 && <div>Aucun sondage.</div>}
        {!loading &&
          polls &&
          <>
            {polls.map((poll) => (
              <PollCardSelector key={poll._id} poll={poll} />
            ))}
            <Pagination />
          </>}

      </div>
    </div>

  </AuthentificatedLayout>

)

// COMPONENT ----------------------------------------
const PollsFactory = Factory<unknown, PollResult>(usePolls, PollView)

export const Polls: React.FC = () => {
  const ctx = useFetch<IPollContext>("polls/polls");

  return (
    <PollsContext.Provider value={ctx}>
      <PaginationProvider>
        <PollsFactory />
      </PaginationProvider>
    </PollsContext.Provider>
  );
};
