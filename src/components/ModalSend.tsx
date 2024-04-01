import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useState } from "react"
import { IsValidAddress } from "../utils/utils"
import { useRPC } from "../store/useRPC"
import { Account, Token } from "../types"
import { SendToken } from "../services/accountService"
import { useToast } from "@chakra-ui/react"

type Props = {
    isOpen: boolean
    onClose: () => void
    token: Token
    account: Account
  }

export const ModalSend :React.FC<Props> = ({isOpen,onClose,token,account}) => {
    const [address,setAddress] = useState('')
    const [cantidad,setCantidad] = useState('')
    const {defaultRPC,rpcs} = useRPC()
    const [loading,setLoading] = useState(false)
    const [unlock,setUnlock] = useState('')
    const toast = useToast()

    const HandleOnSendClick = () => {
        setLoading(true)
        try{
            const response = SendToken(account,unlock,rpcs[defaultRPC],token,address,cantidad)
            setLoading(false)
            onClose() 
            response.then(res => {
                toast({
                    title: 'Transferencia enviada',
                    description: 'Tx:'+ res.tx.hash,
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                  })
            }).catch(err => {
                toast({
                    title: 'Error',
                    description: err,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                  })
            })
        }
        catch(err){
            setLoading(false)
            onClose()
            toast({
                title: 'Error',
                description: 'Hubo un error en la transferencia',
                status: 'error',
                duration: 3000,
                isClosable: true
              })     
        }
    }

    return(<>
    <Modal className="p-3" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            <ModalHeader className="flex justify-center text-xl font-bold text-orange-700">
                Enviar {token.simbol}
            </ModalHeader>
            <ModalBody>
                <Input label="Enviar a ..." type="text" value={address}
                  isRequired
                  onChange={(e) => setAddress(e.target.value)}
                  isInvalid={!IsValidAddress(address)}/>
                <Input isRequired label="Cantidad" type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}/>
                <Input isRequired type="password" label="Password"
                  value={unlock} onChange={(e)=>setUnlock(e.target.value)}/>
            </ModalBody>
            <ModalFooter className="justify-center">
                <Button className="btn-gradient rounded-full text-white"
                  isDisabled={!IsValidAddress(address)||unlock.length===0}
                  isLoading={loading}
                  onClick={HandleOnSendClick}>Enviar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    
    </>)
}