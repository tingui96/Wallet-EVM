import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useState } from "react"
import { IsValidAddress } from "../utils/utils"
import { useRPC } from "../store/useRPC"
import { Account, Token } from "../types"
import { SendToken, sendEth } from "../services/accountService"
import { useToast } from "@chakra-ui/react"
import { usePending } from "../store/usePending"
import { ModalScanner } from "./ModalScanner"
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

type Props = {
    isOpen: boolean
    onClose: () => void
    token: Token|null
    account: Account
  }

export const ModalSend :React.FC<Props> = ({isOpen,onClose,token,account}) => {
    const [address,setAddress] = useState('')
    const [showScanner,setShowScanner] = useState(false)
    const [cantidad,setCantidad] = useState('')
    const {defaultRPC,rpcs} = useRPC()
    const { AnyPending , NothingPending} = usePending()
    const [loading,setLoading] = useState(false)
    const [unlock,setUnlock] = useState('')
    const toast = useToast()

    const HandleOnSendClick = () => {
        setLoading(true) 
        const response = token ? SendToken(account,unlock,rpcs[defaultRPC],token,address,cantidad)
            :   sendEth(account,unlock,rpcs[defaultRPC],address,cantidad) 
        setLoading(false)
        AnyPending()
        onClose() 
        response.then(res => {
            if(res.response)
            toast({
                title: 'Transferencia enviada',
                description: 'Tx:'+ res.tx.hash,
                status: 'success',
                duration: 3000,
                isClosable: true
              })
              else
                toast({
                  title: 'Ocurrio un error',
                  description: 'Tx:'+ res.tx,
                  status: 'error',
                  duration: 3000,
                  isClosable: true
                })
            NothingPending()
        })
    }
    return(<>
    <Modal className="p-3" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            <ModalHeader className="flex justify-center text-xl font-bold text-orange-700">
                Enviar {token?token.simbol:'ETH'}
            </ModalHeader>
            <ModalBody className="grid">
              <div className="flex justify-items-center gap-1">
                <Input className="rounded-xl shadow-lg" label="Enviar a ..." type="text" value={address}
                  isRequired
                  onChange={(e) => setAddress(e.target.value)}
                  isInvalid={!IsValidAddress(address)} />
                  <Button isIconOnly className="h-full btn-gradient text-white" onClick={()=> setShowScanner(true)}>
                    <QrCodeScannerIcon />

                  </Button>
              </div>          
                <Input className="rounded-xl shadow-lg" isRequired label="Cantidad" type="number"
                  value={cantidad}
                  onChange={(e) => {setCantidad(e.target.value)}}/>
                <Input className="rounded-xl shadow-lg" isRequired type="password" label="Password"
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
    { address === '' && <ModalScanner isOpen={showScanner} onClose={() => setShowScanner(false)} setAddress={setAddress} />}
    </>)
}