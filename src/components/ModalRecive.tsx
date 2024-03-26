import { Button,Input, InputGroup, InputRightElement, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, } from "@chakra-ui/react"
import { useClipboard } from "@chakra-ui/react"
import { useAccount } from "../store/useAccount"
import QRCode from "react-qr-code"
import { CheckIcon, CopyIcon } from "@chakra-ui/icons"
type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ModalRecive: React.FC<Props> = ({isOpen,onClose}) => {
  const { account } = useAccount()
  const {onCopy ,hasCopied} = useClipboard(account? account.publicKey: '')
    return(
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
                 <ModalContent>
                   <ModalHeader>Escanee este código para recibir</ModalHeader>
                   <ModalCloseButton />
                   <ModalBody >
                       <InputGroup  marginLeft={12}>
                           {<QRCode value={account ? account.publicKey : ''} size={256} bgColor="#282c34" fgColor="#fff" level="H" />}
                       </InputGroup>
                       <Text textAlign="center"fontSize="xl" mt={5}>O copie la direccion a continuación:</Text>
                       <InputGroup alignItems="center" size='md'>
                       
                          <Input fontSize='0.8em' readOnly value={account?.publicKey} pr="4.5rem"/>
                          <InputRightElement width="4.5rem" >
                          <Button h="1.75rem" size='sm' onClick={onCopy}>
                            { !hasCopied ? <CopyIcon/>:<CheckIcon/>}
                          </Button>
                          </InputRightElement>
                       </InputGroup>
                   </ModalBody>
                   <ModalFooter>
                     <Button colorScheme="red" onClick={onClose}>Close</Button>
                   </ModalFooter>
                 </ModalContent>
               </Modal>
    )
}