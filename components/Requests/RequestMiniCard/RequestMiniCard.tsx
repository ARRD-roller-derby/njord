import { RequestInterface } from '../../../types/Request.interface'
import RequestMiniCardView from './RequestMiniCardView'
import useRequestMiniCard from './useRequestMiniCard'

interface props {
  readonly reSync: Function
  readonly request: RequestInterface
}
export default function NotificationMiniCard({ request, reSync }: props) {
  const useProps = useRequestMiniCard(request, reSync),
    props = { request, ...useProps }
  return <RequestMiniCardView {...props} />
}
