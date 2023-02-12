import dynamic from 'next/dynamic';
import validator from 'validator';
interface props {
  readonly value?: string
  readonly setValue?: Function
}

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export default function MiniFormTextEdit({ value, setValue }: props) {
  return (
    <MarkdownEditor
      height={200}
      minHeight={200}
      enableScroll={false}
      preview="edit"
      value={validator.unescape(value || '')}
      onChange={(text: string) => setValue(text)}
    />
  )
}