/* eslint-disable react/display-name */
export default function Factory<T>(hook: Function, Component: any):Function {
  return (props: T): JSX.Element => <Component {...props} {...hook(props)} />
}
