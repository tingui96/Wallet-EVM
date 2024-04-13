import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { Scanner } from '@yudiel/react-qr-scanner';

type Props = {
    isOpen: boolean
    onClose: () => void
    setAddress: (string:string) => void
}
export const ModalScanner: React.FC<Props> = ({isOpen,onClose,setAddress}) => {
    
    return(
        <Modal className="p-3" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            <ModalHeader className="flex justify-center text-xl font-bold text-orange-700">
                Escanea la direccion
            </ModalHeader>
            <ModalBody>                          
                <Scanner
                    onResult={(text,result) => {setAddress(text); console.log(result)}}
                    onError={(error) => console.log(error?.message)}/>
            </ModalBody>
            <ModalFooter className="justify-center">
                
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}