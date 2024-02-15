
import styles from "../styles/Home.module.css";

import { NextPage } from "next";
import {
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
                  <EmailLogin/>
                </>
              ) : (
              <div className={styles.spinner} />
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.grid}></div>


    
  </main>
);
};

//authentication with google 

const GoogleLoginButton  = () =>{
  const  {connect} = useEmbeddedWallet();

   const signinwithGoogle = async ()  =>{
    await connect({
      strategy : "google",
    });


  };

  return(
    <button className={styles.button} onClick ={signinwithGoogle}>

<svg
        className=" h-5 w-5 mr-2"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
      Authenticate with Google
    </button>
  );

};

//login with email
const EmailLogin = () =>{
  const [state, setState] = useState<
  "init" | "enter_email" | "send_email"  | "email_verified">("init")

   const [email , setEmail] = useState<string>("");
   const  [verificationCode  , setVerificationCode] = useState<string>("");
   const {connect , sendVerificationEmail}= useEmbeddedWallet();  

   const handleEmailClick = async()  =>{
   setState("enter_email");
   };

   const handleEmailEntered  = async () => {
    if(!email){
      alert("Please enter an email"); 
      return

    };
    setState("send_email");
    await  sendVerificationEmail({ email});
    setState("email_verified");
   };

   const handleEmailVerification = async () => {
    if (!email  || !verificationCode ){
      alert("Kindly enter verification code");
      return
    };
    await connect({strategy : "email_verification", email ,verificationCode})
   };

   if(state == "enter_email"){
    return(
      <>
      <p>Please enter email </p>
      <input className={styles.input} placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value )}/>
      <button className={styles.button} onClick={handleEmailEntered}> Contine</button>
      <a onClick={() => setState("init")}>
        <p>Back</p>
      </a>
      </>
    )
   }
   if(state =="send_email"){
    return 
      <div className={styles.spinner}/>
      
   }

   if(state=="email_verified"){
    return( 
    <>
    <p>Enter verification code sent to your email</p>
    <input
          className={styles.input}
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button className={styles.button} onClick={handleEmailVerification}>
          Verify
        </button>
        <a onClick={() => setState("init")}>
          <p>Go Back</p>
        </a>
      </>
  
    );
   };

   return(
    <>
    <GoogleLoginButton/>
    <button className={styles.button} onClick={handleEmailClick}>

    <svg
          className=" h-5 w-5 mr-2"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect height="16" rx="2" width="20" x="2" y="4" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        Email Sign-In
    </button>
    </>
   )


   };


export default Home;