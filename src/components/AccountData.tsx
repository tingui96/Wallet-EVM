import { BellIcon } from "@chakra-ui/icons"
import { Button, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { TableToken } from "./TableToken"
import { ModalRecive } from "./ModalRecive"
import { useDisclosure } from "@chakra-ui/react"

export const AccountData = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
    <>
       <InputGroup alignItems="center">
           <Text textAlign="center" width=" 15rem" as="b" fontSize="xl">
               Datos de la Cuenta
           </Text>
           <InputRightElement width="7rem">
            {/* Notificaciones */}
                  <BellIcon w={6} h={6} mr={5}/> 
            {/* Notificaciones */}
               <Button h="1.75rem"  colorScheme="telegram" size="sm" mr={2}
                   onClick={onOpen}>Recibir</Button>
               <ModalRecive isOpen={isOpen} onClose={onClose}/>
            </InputRightElement>
        </InputGroup>
        <InputGroup>
            <TableToken/>
        </InputGroup>
    </>
    )
}