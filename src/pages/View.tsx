import React from "react";
import { useAccount } from "../store/useAccount";
import { Init } from "./Init";
import { Main } from "./Main";
import { Unlock } from "./Unlock";

const Views:React.FC = () => {  
  const {account} = useAccount()
  console.log(account)
    //Condiciones de navegacion
    return(
        <>
            { !account && <Init/>}
            { account && !account.hasPass.value && <Unlock/>}
            { account && account.hasPass.value && <Main/>}
        </>
    )
};
export default Views;