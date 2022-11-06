import styles from "./card.module.css";

type CardProps = {
  children?: React.ReactNode;
  size?: "table" | "auto";
};

export const Card: React.FC<CardProps> = ({ children, size = "normal" }) => (
  <div className={styles.container} data-size={size}>
    {children}
  </div>
);
