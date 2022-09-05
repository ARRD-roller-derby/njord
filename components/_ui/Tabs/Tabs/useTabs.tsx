import { useState, Children, ReactElement } from 'react'

interface Props {
  readonly children: Array<JSX.Element>
}
export default function useTabs({ children }: Props) {
  const tabs = Children.toArray(children).map(
      (child: ReactElement) => child.props.field
    ),
    [current, setCurrent] = useState<string>(tabs.at(0))

  return { current, setCurrent, tabs }
}
