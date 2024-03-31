import { useTokenList } from "../store/useTokenList"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader,Tooltip, TableRow, useDisclosure } from "@nextui-org/react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalAddToken } from "./ModalAddToken";

export const TableToken: React.FC = () => {
    const {tokenList, addToken, removeToken} = useTokenList()
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <Table aria-label="token list"
          bottomContent={
            <div className="flex justify-center p-3">
              <Button isIconOnly onClick={onOpen}
               className="rounded-full bg-gradient-to-tr from-violet-700 to-cyan-500 text-white">
                <AddCircleOutlineIcon/>
              </Button>
              <ModalAddToken isOpen={isOpen} onClose={onClose} addToken={addToken}  />
            </div>}> 
         <TableHeader>
             <TableColumn>Token</TableColumn>
             <TableColumn >cantidad</TableColumn>
             <TableColumn>Enviar</TableColumn>
             <TableColumn>Quitar</TableColumn>
             {/*<Th>Pendientes de aceptar</Th>*/}
         </TableHeader>
         <TableBody>
             {tokenList?.map((element,key) => (
                   <TableRow key={key}>
                      <TableCell>{element.simbol}</TableCell>
                      <TableCell width={300}>{ (Number.parseInt(element.balance) / Math.pow(10,Number.parseInt(element.decimals))) }</TableCell>
                      <TableCell>
                        <Tooltip content={'Enviar '+element.simbol}>
                          <div>
                            <KeyboardDoubleArrowRightIcon className="text-blue-900"/>
                          </div>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip content={'Quitar '+element.simbol}>
                          <div className="cursor-pointer" onClick={() => removeToken(key)}>
                            <ClearIcon className="text-red-700"/>
                          </div>
                        </Tooltip>
                      </TableCell>
                   </TableRow> ))}
         </TableBody>  
       </Table>
    )
}