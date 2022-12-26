import { FC } from "react";
import { ShopContest } from "../../shop/shop-contest/shop-contest";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import styles from './shop.module.css';

export const ShopView: FC = () => (
  <AuthentificatedLayout>
    <div className={styles.container}>
      <Tabs>
        <Tab field="Classement">
          <ShopContest />
        </Tab>
        <></>
      </Tabs>
    </div>

  </AuthentificatedLayout>
)