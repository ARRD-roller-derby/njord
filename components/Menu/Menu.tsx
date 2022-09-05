import MenuView from "./MenuView";
import useMenu from "./useMenu";

export default function Menu(){
  const useProps = useMenu()

  return <MenuView {...useProps}/>
}