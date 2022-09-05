import ScrollHContainerView from "./ScrollHContainerView";
import useScrollHContainer from './useScrollHContainer';

interface Props {
  readonly children: Array<JSX.Element>
  readonly id: string
}

export default function ScrollHContainer(props:Props){
  const useProps = useScrollHContainer(props)
  return <ScrollHContainerView {...props} {...useProps}/>
}