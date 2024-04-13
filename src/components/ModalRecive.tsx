import { Button , Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useAccount } from "../store/useAccount"
import QRCode from "react-qr-code"
import CheckIcon from '@mui/icons-material/Check';
import CopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard"
import { useState } from "react"
type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ModalRecive: React.FC<Props> = ({isOpen,onClose}) => {
  const { account } = useAccount()
  const [hasCopied, setHasCopied] = useState(false)
    return(
        <Modal className="p-3" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex justify-center text-xl font-bold text-orange-700">Escanee este código para recibir</ModalHeader>
            <ModalBody >
                <div className="flex justify-center">
                    {<QRCode value={account ? '0x'+ account.keystore.address : ''} size={200} bgColor="#282c34" fgColor="#fff" level="H" />}
                </div>
                <div className="flex justify-center">O copie la direccion a continuación:</div>
                <div className="flex justify-center">          
                   <div className="flex w-full text-sm rounded-l-full">
                      <input readOnly aria-label="" className="flex w-full text-center bg-gradient-to-tr from-gray-400 to-gray-600 text-white rounded-l-full" value={'0x' + account?.keystore.address}/>   
                    </div>
                   <div>
                      <Button className="rounded-r-full bg-gradient-to-t btn-gradient text-white p-3"
                       isIconOnly
                        onClick={() => {
                          copy(account? '0x'+ account.keystore.address: '')
                          setHasCopied(true)
                        }}>
                        { !hasCopied ? <CopyIcon/>:<CheckIcon/>}
                      </Button>
                   </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-gradient text-white rounded-full" onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}