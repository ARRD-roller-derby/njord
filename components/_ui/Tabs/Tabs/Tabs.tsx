import TabsView from './TabsView'
import useTabs from './useTabs'

interface Props {
  readonly children: Array<JSX.Element>
}

export default function Tabs(props: Props) {
  const useProps = useTabs(props)
  return <TabsView {...props} {...useProps} />
}
