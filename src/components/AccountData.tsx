import { InputGroup, useDisclosure } from "@chakra-ui/react"
import { TableToken } from "./TableToken"
import { ModalRecive } from "./ModalRecive"
import { Button} from "@nextui-org/react"
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useAccount } from "../store/useAccount"
import { useEffect, useState } from "react"
import { getBalance } from "../services/accountService";
import { useRPC } from "../store/useRPC";

export const AccountData = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account } = useAccount()
    const [balance, setBalance] = useState<string>()
    const { defaultRPC } = useRPC()
    useEffect(() => {
        async function fetchBalance() {
            if(account)
            return await getBalance(defaultRPC,account.keystore.address)
        }
        fetchBalance().then(res => {
           setBalance(res);
        })
        
    },[account])
    return(
    <>
        <div className="flex justify-center justify-items-center gap-1 p-1">
            <h1 className="font font-mono text-3xl">{balance ? balance : '0.0'}</h1>
        </div>
        <div className="flex justify-center gap-3 p-3">
            <Button isIconOnly className="max-w-2 rounded-full bg-cyan-950 text-white shadow-lg" onClick={onOpen}><GetAppOutlinedIcon fontSize="small"/></Button>
            <Button isIconOnly className="max-w-2 rounded-full bg-cyan-950 text-white shadow-lg" onClick={onOpen}><SendOutlinedIcon fontSize="small"/></Button>
            <ModalRecive isOpen={isOpen} onClose={onClose}/>
        </div>
        <InputGroup>
            <TableToken/>
        </InputGroup>   
    </>
    )
}