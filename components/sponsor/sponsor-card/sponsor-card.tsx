/* eslint-disable @next/next/no-img-element */
import { FC, useContext, useEffect } from 'react';
import { ISponsor } from '../../../types/sponsor.interface';
import styles from './sponsor-card.module.css';
import MiniForm from '../../MiniForm/MiniForm/MiniForm';
import { UserInterface } from '../../../types/User.interface';
import { useSession } from 'next-auth/react';
import { SponsorsContext } from '../../_pageRelated/sponsors/sponsors';
import Factory from '../../_layouts/Factory/Factory';
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit';
import MiniFormStringRead, { MiniFormStringLinkRead } from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead';
import MiniFormTextEdit from '../../MiniForm/MiniFormText/MiniFormTextEdit/MiniFormTextEdit';
import MiniFormTextRead from '../../MiniForm/MiniFormText/MiniFormTextRead/MiniFormTextRead';
import { SponsorLogoCropper } from '../sponsor-logo-cropper/sponsor-logo-cropper';
import usePost from '../../_hooks/usePost';
import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton';
import { UsersSelector } from '../../User/users-selector/users-selector';

interface SponsorProps {
  sponsor: ISponsor;
}

interface SponsorCardResult {
  user: UserInterface
  uri: string
  reSync: () => void
  submitLogo: (logo: string) => void
  deleteSponsor: () => void
  submitUsers: (users: string[]) => void
}

export const useSponsorCard = ({ sponsor }: SponsorProps): SponsorCardResult => {
  const { data: session } = useSession(),
    uri: string = '/sponsor/edit_field',
    { data, post } = usePost(uri),
    { data: dataDel, post: postDelete } = usePost('/sponsor/delete'),
    { reSync } = useContext(SponsorsContext)

  const submitLogo = (logo: string) => {
    post({ id: sponsor._id, field: 'logo', value: logo })
  }

  const submitUsers = (users: string[]) => {
    post({ id: sponsor._id, field: 'users', value: users })
  }

  const deleteSponsor = () => {
    postDelete({ id: sponsor._id })
  }

  useEffect(() => {
    if (data || dataDel) {
      reSync()
    }
  }, [data, dataDel])

  return {
    user: session?.user,
    uri,
    reSync,
    submitLogo,
    deleteSponsor,
    submitUsers
  };
}

export const SponsorCardView: FC<SponsorProps & SponsorCardResult> = ({ sponsor, user, uri, reSync, submitLogo, deleteSponsor, submitUsers }) => (
  <div className={styles.container}>
    <div className={styles.logo}>
      <SponsorLogoCropper onsubmit={submitLogo} defaultLogo={sponsor.logo} />
    </div>

    <MiniForm
      user={user}
      label="Nom"
      field="name"
      profiles
      onlyAdmin
      uri={uri}
      model={sponsor}
      reSync={reSync}
      editField={<MiniFormStringEdit />}
      readField={<MiniFormStringRead />}
    />

    <MiniForm
      user={user}
      label="Description"
      field="description"
      profiles
      onlyAdmin
      uri={uri}
      model={sponsor}
      reSync={reSync}
      editField={<MiniFormTextEdit />}
      readField={<MiniFormTextRead />}
    />

    <MiniForm
      user={user}
      label="Lien"
      field="link"
      profiles
      onlyAdmin
      uri={uri}
      model={sponsor}
      reSync={reSync}
      editField={<MiniFormStringEdit />}
      readField={<MiniFormStringLinkRead />}
    />
    <UsersSelector onSelect={submitUsers} defaultValue={sponsor.users.map((user) => ({
      label: user.name,
      value: user.id
    }))} />

    <div className={styles.delete}>
      <AutoConfirmButton onClick={deleteSponsor} text='Supprimer le sponsor' textConfirm='Je confirme' />
    </div>
  </div>
);

export const SponsorCard = Factory<SponsorProps, SponsorCardResult>(useSponsorCard, SponsorCardView)