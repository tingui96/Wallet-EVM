import React from "react";
import { useAccount } from "../store/useAccount";
import { Init } from "../components/Init";
import { Main } from "../components/Main";
import { Unlock } from "../components/Unlock";

const Views:React.FC = () => {  
  const {account} = useAccount()
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