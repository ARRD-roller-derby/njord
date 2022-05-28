import classes from './MenuHeader.module.css';
import MenuHeaderMobile from './MenuHeaderMobile';
import MenuHeaderDesktop from './MenuHeaderDesktop';
import useIsMobile from '../../utils/useIsMobile';

export default function MenuHeader() {
  const isMobile = useIsMobile();
  return (
    <div className={classes.container}>
      {isMobile ? <MenuHeaderMobile /> : <MenuHeaderDesktop />}
    </div>
  );
}
