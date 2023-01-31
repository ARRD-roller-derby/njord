import { useContext, useEffect } from "react"
import { ISponsor } from "../../../types/sponsor.interface"
import Pagination from "../../pagination/pagination"
import { PaginationContext } from "../../pagination/pagination.context"
import { PaginationProvider } from "../../pagination/pagination.provider"
import useFetch from "../../_hooks/useFetch"
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated"
import Factory from "../../_layouts/Factory/Factory"
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel"
import PageActions from "../../_ui/PageActions/PageActions"
import styles from "./sponsors.module.css"
import { createContext } from "react";
import { Fetch } from "../../../types/fetch.interface"
import { FullscreenPopin } from "../../fullscreen-popin/fullscreen-popin"
import { SponsorCreatePopin } from "../../sponsor/sponsor-create-popin/sponsor-create-popin"
import { SponsorCard } from "../../sponsor/sponsor-card/sponsor-card"

export type useProps = {
  data: {
    sponsors: ISponsor[],
    totalPage: number
  };
  loading: boolean;
  reSync: () => void
}

// CONTEXT
export const SponsorsContext = createContext(null);

// HOOK
export const useSponsors = (): useProps => {
  const ctx = useContext<Fetch<{ sponsors: ISponsor[], totalPage: number }>>(SponsorsContext),
    { pagination, setTotal } = useContext(PaginationContext)

  useEffect(() => {
    if (!ctx.loading && pagination?.currentPage <= ctx.data?.totalPage) {
      ctx.refetch({ page: pagination.currentPage })
    }
  }, [pagination.currentPage])

  useEffect(() => {
    if (!ctx.loading && ctx?.data?.totalPage) {
      setTotal(ctx?.data.totalPage)
    }
  }, [ctx?.data])

  return {
    ...ctx,
  };
}

//VIEW
export const SponsorsView = ({ data, loading }: useProps) => {
  return (
    <AuthentificatedLayout>
      <PageActions>
        <FullscreenPopin text="Ajouter un sponsor">
          <SponsorCreatePopin />
        </FullscreenPopin>
      </PageActions>
      <div className={styles.container}>
        {loading && <LoaderWheel />}

        <div className={styles.items}>
          {data?.sponsors && data?.sponsors.length === 0 && <div>Aucun sponsor.</div>}
          {!loading &&
            data?.sponsors &&
            <>
              {data.sponsors.map((sponsor) => (
                <SponsorCard sponsor={sponsor} key={sponsor._id} />
              ))}
              <Pagination />
            </>}

        </div>
      </div>

    </AuthentificatedLayout>
  )
}

//COMPONENT
const SponsorsFactory = Factory<unknown, useProps>(useSponsors, SponsorsView)

export const Sponsors: React.FC = () => {
  const ctx = useFetch<ISponsor[]>("sponsors/sponsors");

  return (
    <SponsorsContext.Provider value={ctx}>
      <PaginationProvider>
        <SponsorsFactory />
      </PaginationProvider>
    </SponsorsContext.Provider>
  );
};
