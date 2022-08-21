import LoginFormView from './LoginFormView'
import useLoginForm from './useLoginForm';

export default function LoginForm() {
  const props = useLoginForm()
  return <LoginFormView {...props}/>
}
