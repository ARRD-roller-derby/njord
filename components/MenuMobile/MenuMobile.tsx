import MenuMobileView from "./MenuMobileView";
import useMenuMobile from './useMenuMobile';

export default function MenuMobile(){
  const props = useMenuMobile();
  return <MenuMobileView {...props}/>
}