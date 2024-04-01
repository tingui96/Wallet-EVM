import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalAddToken } from "./ModalAddToken";
import { ModalSend } from "./ModalSend";
import { useEffect, useState } from "react";
import { Token } from "../types";
import { useAccount } from "../store/useAccount";
import { fetchAllTokenBalance } from "../services/accountService";
import { useRPC } from "../store/useRPC";

export const TableToken: React.FC = () => {
    const { account } = useAccount()
    const {defaultRPC,rpcs,updateTokenList,addToken,removeToken} = useRPC()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenSend, onOpen:onOpenSend, onClose:onCloseSend } = useDisclosure();
    const [token,setToken] = useState<Token>()
    useEffect(()=>{
      async function fetchBalanceToken()
      {
        if(account && rpcs[defaultRPC].tokenList)
        {
          let newtokenList = await fetchAllTokenBalance(defaultRPC,rpcs,account.keystore.address)
          updateTokenList(newtokenList)
        }
      }
      fetchBalanceToken()
    },[account,defaultRPC])

    return (
        <Table aria-label="token list"
          bottomContent={
            <div className="flex justify-center p-3">
              <Button isIconOnly onClick={onOpen}
               className="rounded-full bg-gradient-to-tr from-violet-700 to-cyan-500 text-white">
                <AddCircleOutlineIcon/>
              </Button>
              <ModalAddToken isOpen={isOpen} onClose={onClose} addToken={addToken}  />
              {token && account &&<ModalSend isOpen={isOpenSend} onClose={onCloseSend} token={token} account={account}/>}
            </div>}> 
         <TableHeader>
             <TableColumn>Token</TableColumn>
             <TableColumn >cantidad</TableColumn>
             <TableColumn>Enviar</TableColumn>
             <TableColumn>Quitar</TableColumn>
             {/*<Th>Pendientes de aceptar</Th>*/}
         </TableHeader>
         <TableBody>
             {rpcs[defaultRPC].tokenList?.map((element,key) => (
                   <TableRow key={key}>
                      <TableCell>{element.simbol}</TableCell>
                      <TableCell width={300}>{ (Number.parseInt(element.balance) / Math.pow(10,Number.parseInt(element.decimals))) }</TableCell>
                      <TableCell>    
                          <Button isIconOnly className="bg-foreground-20" onClick={() => {setToken(element), onOpenSend()}}>
                            <KeyboardDoubleArrowRightIcon className="text-blue-900"/>
                          </Button>
                      </TableCell>
                      <TableCell>
                       
                          <Button isIconOnly className="bg-foreground-20" onClick={() => {
                            removeToken(key)}}>
                            <ClearIcon className="text-red-700"/>
                          </Button>
                      </TableCell>
                   </TableRow>
                ))}
         </TableBody>  
       </Table>
    )
}