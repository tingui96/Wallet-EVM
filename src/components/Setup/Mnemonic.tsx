import { Button, CardFooter } from "@nextui-org/react"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useMemo, useState } from "react"
import copy from 'copy-to-clipboard';
import { useAccount } from "../../store/useAccount";
import { createAccount } from "../../services/accountService";
import { MnemonicToPrivateKey } from "../../services/accountService";
import { Account } from "../../types";

type Props = {
    mnemonic:string
    password: string
    goNext:() => void
}
export const Mnemonic:React.FC<Props> = ({password,goNext}) => {
    const {setAccount} = useAccount()
    const [loading,setLoading] = useState(false)
    const [complete,setComplete] = useState(false)
    const mnemonic = useMemo(() => { return createAccount()},[])
    const [words] = useState(mnemonic.split(' '))
    
    const HandleContinueOnClick = () => {
        setLoading(true)
        let newAccount = MnemonicToPrivateKey(mnemonic)
        newAccount.encrypt(password).then(res => {
            const fecha = new Date()
            const account:Account = {
                keystore:JSON.parse(res),
                hasPass:
                    {
                        value:true,
                        fecha:fecha.getTime()
                    }
                }
            setAccount(account)
            setLoading(false)
            goNext()
            })
        }
    return(
<>  <div className="flex justify-center text-lg text-slate-800 font-bold p-3">Asegúrese de guardar la frase semilla</div>
    <div className="flex flex-col justify-center justify-items-center p-2">
        <div className="grid grid-cols-3 max-w-[350px] shadow-lg border-3 border-cyan-600 rounded-xl justify-items-center gap-3 p-4">
            { words.map((element,index) => (
                <div className="word" key={index}>{element}</div>
            ))}
            <div className="grid col-start-2 justify-center">
                <Button isIconOnly className="btn-gradient text-white" 
                    onClick={() => {
                        copy(mnemonic)
                        setComplete(true)
                    }}>
                        <ContentCopyIcon/>
                    </Button>
            </div>  
        </div>
    </div>
    <CardFooter className="flex flex-col gap-2">
        <Button isLoading={loading} isDisabled={!complete} fullWidth radius="full" 
            className="btn-gradient text-white"
            onClick={HandleContinueOnClick}>
            Continue
        </Button>           
    </CardFooter>
</>
    )
}