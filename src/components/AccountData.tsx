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
import { ModalSend } from "./ModalSend";

export const AccountData = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenSend, onOpen:onOpenSend, onClose:onCloseSend } = useDisclosure();
    const { account } = useAccount()
    const [balance, setBalance] = useState<string>()
    const { defaultRPC, rpcs } = useRPC()
    useEffect(() => {
        if(account) getBalance(rpcs[defaultRPC],account.keystore.address).then(res => {setBalance(res)})
    },[account,defaultRPC])
    return(
    <>
        <div className="flex justify-center justify-items-center gap-1 p-1">
            <h1 className="font font-mono text-3xl">{balance ? balance : '0.0'}</h1>
        </div>
        <div className="flex justify-center gap-3 p-3">
            <Button isIconOnly className="max-w-2 rounded-full bg-cyan-950 text-white shadow-lg" onClick={onOpen}><GetAppOutlinedIcon fontSize="small"/></Button>
            <Button isIconOnly className="max-w-2 rounded-full bg-cyan-950 text-white shadow-lg" onClick={onOpenSend}><SendOutlinedIcon fontSize="small"/></Button>
            <ModalRecive isOpen={isOpen} onClose={onClose}/>
            { account && <ModalSend isOpen={isOpenSend} onClose={onCloseSend} account={account} token={null}/> }
        </div>
        <InputGroup>
            <TableToken/>
        </InputGroup>   
    </>
    )
}