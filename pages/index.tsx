
import styles from "../styles/Home.module.css";

import { NextPage } from "next";
import {
  ConnectWallet,
  embeddedWallet,
  useAddress,
  useConnectionStatus,
  useDisconnect,
  useEmbeddedWallet,
  useWallet
} from "@thirdweb-dev/react";
import {useEffect, useState} from 'react';


const Home: NextPage = () => {
   const address = useAddress();
   const walletconnected = useWallet("embeddedWallet");
   const [email, setEmail] = useState<string | undefined>();
   const connectionStatus = useConnectionStatus();
   const disconnect = useDisconnect();




   useEffect(()=>{
    if(walletconnected){
      walletconnected.getEmail().then((email) => setEmail(email));

    
    }
    
   },[walletconnected]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
            <h3 className={styles.title}>
              Smart Wallet {""}
              <span className={styles.gradientText0}>
                Email Login 
              </span>
            </h3>

            {address ? (
              <>
              <h4>Connect with {email}</h4>
              <p>Your wallet address : {address}</p>
              <button className={styles.button} onClick={disconnect}>Logout </button>
              </>
            ) : (
              <>
              {connectionStatus == "disconnected" ? (

                <>
                </Login>
                </>
              ) : (
              
                <div className = {styles.spinner}/>
              }
              
              </>
            
            )
}
            </div>

        </div>
    
    </main>
  );
};

export default Home;
