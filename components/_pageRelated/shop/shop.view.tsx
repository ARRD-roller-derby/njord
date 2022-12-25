import { FC } from "react";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import styles from './shop.module.css'

export const ShopView: FC = () => (
  <AuthentificatedLayout>
    <p className={styles.container}>Bientôt</p>
  </AuthentificatedLayout>
)