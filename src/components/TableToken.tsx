import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalAddToken } from "./ModalAddToken";
import { ModalSend } from "./ModalSend";
import { useEffect, useState } from "react";
import { Token } from "../types";
import { useAccount } from "../store/useAccount";
import { useRPC } from "../store/useRPC";
import { ethers } from "ethers";
import { ABI } from "../const";
import { getTokenBalance } from "../services/accountService";
import { Navigate } from "react-router-dom";
import { usePending } from "../store/usePending";

export const TableToken: React.FC = () => {
    const { account } = useAccount()
    const { pending } = usePending()
    const {defaultRPC,tokenList,rpcs,addToken,updateTokenBalance,removeToken} = useRPC()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenSend, onOpen:onOpenSend, onClose:onCloseSend } = useDisclosure();
    const [token,setToken] = useState<Token>()

    useEffect(() => {
      tokenList[defaultRPC].forEach(async (token) => {
        try {
            let balance = await getTokenBalance(rpcs[defaultRPC],token.address,account?.keystore.address)
            token.balance = balance
            let newToken = structuredClone(token)
            newToken.balance = balance
            updateTokenBalance(newToken)
          }       
          catch (error) {
          console.error(`Error al crear instancia de contrato para ${token.address}:`, error);
        }
      })
    },[account,defaultRPC,pending])

    useEffect(() => {
      if(!tokenList[defaultRPC] || tokenList[defaultRPC].length === 0) return
      let rpc = rpcs[defaultRPC]
      const provider = new ethers.JsonRpcProvider(rpcs[defaultRPC].url); 
      tokenList[defaultRPC].forEach(async (token) => {
        try {
          const contract = new ethers.Contract(token.address, ABI, provider);
          const transferEvent = contract.filters.Transfer()
          contract.addListener(transferEvent, async() => {
            let balance = await getTokenBalance(rpc,token.address,account?.keystore.address)
            token.balance = balance
            let newToken = structuredClone(token)
            newToken.balance = balance
            updateTokenBalance(newToken)
             })          
        } catch (error) {
          console.error(`Error al crear instancia de contrato para ${token.address}:`, error);
        }
      });
  
      return () => {
        tokenList[defaultRPC].forEach((token) => {
          const contract = new ethers.Contract(token.address, ABI, provider);
          const transferEvent = contract.filters.Transfer()
          contract.removeAllListeners(transferEvent);
        });
      };
    }, []);
    return (
      <>
      {account&& <Navigate to="/"/>}
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
         </TableHeader>
         <TableBody>
             {tokenList[defaultRPC]?.map((element,key) => (
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
      </>
    )
}