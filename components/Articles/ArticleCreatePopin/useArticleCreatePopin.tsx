import { useSession } from 'next-auth/react'
import usePost from '../../_hooks/usePost'
import { useEffect, useState } from 'react'
interface Props {
  readonly close: Function
  readonly reSync: Function
}

export default function useArticleCreatePopin({ reSync,close }: Props) {
  const { data: session } = useSession(),
    [form, setForm] = useState<{
      content: string
      profile: string
      visibility: string
    }>({
      content: '',
      profile: session?.user?.profiles.at(0),
      visibility: 'league',
    }),
    { data: article, loading, post } = usePost('news/add')


    useEffect(()=>{

      if(article){
        reSync()
        close()
      }
    },[article])
  return {
    onSubmit: ()=>post(form),
    loading,
    form,
    onChange: (key: string, value: string) =>
      setForm((prevState) => ({ ...prevState, [key]: value })),
    profiles: session.user?.profiles.map((profile: string) => ({
      label: profile,
      value: profile,
    })),
  }
}
