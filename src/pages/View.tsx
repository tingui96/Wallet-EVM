import { Main } from "./Main.tsx";
import { useAccount } from "../store/useAccount.ts";
import { Navigate } from "react-router-dom";

const Views = () => {
    const {account} = useAccount()
    //Condiciones de navegacion
    return(
        <>
            { !account && <Navigate to='/setup'/>}
            { account && account.saved && account.hasPass && <Main publicKey={account.publicKey}/>}
        </>
    )
};
export default Views;