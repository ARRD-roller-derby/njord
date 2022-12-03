import { Children, cloneElement} from "react";
import classes from "./Tabs.module.css";

interface Props {
  readonly tabs: Array<string>;
  readonly current: string;
  readonly setCurrent: Function;
  readonly children: Array<JSX.Element>;
}
export default function TabsView({
  tabs,
  current,
  setCurrent,
  children,
}: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={classes.tab}
            onClick={() => setCurrent(tab)}
            data-current={tab === current}
          >
            {tab}
  
          </div>
        ))}
      </div>
      <div className={classes.content}>
        {Children.map(
          children.filter((child) => tabs.includes(child.props?.field)),
          (child) => cloneElement(child, { current, ...child?.props })
        )}
      </div>
    </div>
  );
}
