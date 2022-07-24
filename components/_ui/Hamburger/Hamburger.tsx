import classes from "./Hamburger.module.css";

interface props {
  readonly setIsOpen: Function;
  readonly isOpen: Boolean;
}

export default function Hamburger({ setIsOpen, isOpen }: props) {
  return (
    <div className={classes.hamburger} onClick={() => setIsOpen(!isOpen)}>
      {Array(1, 2, 3)
        .fill(1, 3)
        .map((bar: number) => (
          <div className={classes.bar} key={bar} />
        ))}
    </div>
  );
}
