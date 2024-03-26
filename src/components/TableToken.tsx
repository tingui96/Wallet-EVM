import { ArrowRightIcon } from "@chakra-ui/icons"
import { TableContainer, Table, Thead, Tbody,Th, Tr, Td, Tooltip } from "@chakra-ui/react"
import { useTokenList } from "../store/useTokenList"

export const TableToken = () => {
    const {tokenList} = useTokenList()
    const onClick = () => {

    }
    return (
        <TableContainer>
       <Table size='sm'>
         <Thead>
           <Tr>
             <Th>Medicamento</Th>
             <Th >cantidad</Th>
             {/*<Th>Pendientes de aceptar</Th>*/}
           </Tr>
         </Thead>
         <Tbody>
             {tokenList?.map((element,key) => (
                   <Tr key={key}
                    onClick={onClick}>
                     <Td>{element.simbol}</Td>
                     <Td width={300}>{element.balance}</Td>
                     <Td ><Tooltip label={"Send ".concat(element.simbol)}><ArrowRightIcon /></Tooltip></Td>
                   </Tr> ))}
         </Tbody>
       </Table>
       </TableContainer>
    )
}