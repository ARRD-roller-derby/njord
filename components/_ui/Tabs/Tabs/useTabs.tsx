import { useState, Children, ReactElement } from 'react'

interface Props {
  children: Array<JSX.Element>
  defaultCurrent?: string
}
export default function useTabs({ children, defaultCurrent }: Props) {
  const tabs = Children.toArray(children).map(
    (child: ReactElement) => child.props.field
  ),
    [current, setCurrent] = useState<string>(defaultCurrent || tabs.at(0))

  return { current, setCurrent, tabs }
}
