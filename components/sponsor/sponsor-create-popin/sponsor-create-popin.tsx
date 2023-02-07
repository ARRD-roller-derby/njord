/* eslint-disable @next/next/no-img-element */
import { User } from "next-auth";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import usePost from "../../_hooks/usePost";
import Factory from "../../_layouts/Factory/Factory";
import LabeledBlock from "../../_ui/LabeledBlock/LabeledBlock";
import styles from "./sponsor-create-popin.module.css";
import { SponsorsContext } from "../../_pageRelated/sponsors/sponsors";
import { UsersSelector } from "../../User/users-selector/users-selector";
import { SponsorLogoCropper } from "../sponsor-logo-cropper/sponsor-logo-cropper";
import { FullscreenPopinContext } from "../../fullscreen-popin/fullscreen-popin";

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

export type SponsorAddFormForm = {
  name: string
  logo?: string
  link: string
  description: string
  users: User[]
}

export type sponsorCreatePopinResult = {
  onChange: (key: 'name' | 'description' | 'logo' | 'users' | 'link', value: string | string[]) => void,
  form: SponsorAddFormForm,
  loading: boolean,
  onSubmit: (e: React.SyntheticEvent) => void,
  submitLogo: (logo: string) => void,
  close: () => void
};

export const useSponsorCreatePopin = (): sponsorCreatePopinResult => {
  const { refetch } = useContext(SponsorsContext)
  const { close } = useContext(FullscreenPopinContext)
  const [form, setForm] = useState<SponsorAddFormForm>({
    name: '',
    description: '',
    link: '',
    users: [],
    logo: undefined,
  });
  const { data, loading, post } = usePost('sponsor/add')

  const onChange = (key: 'name' | 'description' | 'logo' | 'users' | 'link', value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const submitLogo = (logo: string) => {
    setForm(prevState => ({
      ...prevState, logo
    }))
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    post(form)
  };

  useEffect(() => {
    if (data) {
      close()
      refetch({ page: 1 })
    }
  }, [data])

  return {
    onChange,
    form,
    loading,
    onSubmit,
    submitLogo,
    close,
  };

}

//TODO nettoyer la vu faite par copilot
// inspirer par les questions
export const SponsorAddFormFormView: React.FC<sponsorCreatePopinResult> = ({ onChange, form, loading, submitLogo, onSubmit, close }) => {
  return <form className={styles.container} onSubmit={onSubmit}>
    <h2 className={styles.title}>Ajouter un sponsor</h2>

    <SponsorLogoCropper onsubmit={submitLogo} />
    <LabeledBlock title="Nom">
      <input
        required
        type="text"
        className={styles.input}
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
    </LabeledBlock>
    <LabeledBlock title="Lien">
      <input
        required
        type="text"
        className={styles.input}
        value={form.link}
        onChange={(e) => onChange('link', e.target.value)}
      />
    </LabeledBlock>
    <LabeledBlock title="Description">
      <MarkdownEditor
        height={100}
        minHeight={100}
        enableScroll={false}
        preview="edit"
        value={form.description}
        onChange={(text: string) => onChange('description', text)}
      />
    </LabeledBlock>
    <LabeledBlock title="Utilisateurs">
      <UsersSelector onSelect={(choices) => onChange('users', choices)} />
    </LabeledBlock>
    <div className={styles.buttons}>
      <div className="buttonReset" onClick={close}>Annuler</div>
      <button className="button" type="submit" disabled={loading}>Ajouter</button>
    </div>
  </form>
}

export const SponsorCreatePopin = Factory<unknown, sponsorCreatePopinResult>(useSponsorCreatePopin, SponsorAddFormFormView);
