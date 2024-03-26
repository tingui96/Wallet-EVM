import { Navigate } from "react-router-dom";
import React from "react";
import { useAccount } from "../store/useAccount";

const Views:React.FC = () => {  
  const {account} = useAccount()
    //Condiciones de navegacion
    return(
        <>
            { !account && <Navigate to='/setup' replace/>}
            { account && account.saved && account.hasPass && <Navigate to='/dashboard' replace/>}
        </>
    )
};
export default Views;