import { Button, CardFooter } from "@nextui-org/react"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from "react"
import { useClipboard } from "@chakra-ui/react";
import { useAccount } from "../store/useAccount";
import { MnemonicToPrivateKey } from "../services/accountService";
import { Account } from "../types";
import { SaveAccount } from "../storage/accountStorage";

type Props = {
    mnemonic:string
    password: string
    goNext:() => void
}
export const Mnemonic:React.FC<Props> = ({mnemonic,password,goNext}) => {
    const {setAccount} = useAccount()
    const [loading,setLoading] = useState(false)
    const [complete,setComplete] = useState(false)
    const [words] = useState(mnemonic.split(' '))
    const {onCopy} = useClipboard(mnemonic)
    
    const HandleContinueOnClick = async() => {
        setLoading(true)
        let newAccount = MnemonicToPrivateKey(mnemonic)
        console.log(newAccount)
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
            SaveAccount(account)
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
                        setComplete(true)
                        onCopy()
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