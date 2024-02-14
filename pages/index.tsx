
import styles from "../styles/Home.module.css";

import { NextPage } from "next";
import {
  useAddress,
  useConnectionStatus,
  useDisconnect,
  useEmbeddedWallet,
  useWallet
} from "@thirdweb-dev/react"

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
            <h3 className={styles.title}>
              Smart Wallet {""}
              <span className={styles.gradientText0}>
                With Email Login 
              </span>
            </h3>

        </div>
      </div>
    </main>
  );
};

export default Home;
