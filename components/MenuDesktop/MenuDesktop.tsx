import useMenuDesktop from './useMenuDesktop'
import MenuDesktopView from './MenuDesktopView';

export default function MenuDesktop() {
  const props= useMenuDesktop();

  return <MenuDesktopView {...props }/>
}
