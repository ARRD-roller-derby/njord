import TabsView from './TabsView'
import useTabs from './useTabs'

interface Props {
  readonly children: Array<JSX.Element>
  defaultCurrent?: string
}

export default function Tabs(props: Props) {
  const useProps = useTabs(props)
  return <TabsView {...props} {...useProps} />
}
