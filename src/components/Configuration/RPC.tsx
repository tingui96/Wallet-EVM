import { Checkbox, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react"
import { useRPC } from "../../store/useRPC"
import { useMemo, useState } from "react"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const RPC = () => {
    const {defaultRPC,rpcs,selectRPC,addRPC,removeRPC} = useRPC()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newRPC,setNewRpc] = useState('')
    const index = useMemo(() => {
       let newIndex = rpcs.lastIndexOf(defaultRPC)
       return newIndex
    },[defaultRPC,rpcs]) 
    
    return(<>
        
        <div className="grid gap-3">
        <div className="font font-semibold text-lg text-orange-800 flex justify-center">
            RPC
        </div>
        {
            rpcs?.map((value,i) => (
                <div className="flex justify-between gap-2" key={i}>
                    <Checkbox className="font-mono text-tiny" isSelected={i===index}
                     onClick={() => selectRPC(i)} radius="full">{value}</Checkbox>
                    { i!==0 && <Button className="bg-foreground-20 text-red-700" 
                        onClick={() => removeRPC(i)} isIconOnly>
                        <DeleteOutlineIcon/></Button>}
                </div>
            ))
        }
            <div className="grid justify-center gap-3">
                <Button onPress={onOpen} className="btn-gradient text-white" radius="full" isIconOnly><LibraryAddIcon/></Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar RPC</ModalHeader>
              <ModalBody>
                <Input type="text" label="RPC" value={newRPC} onChange={(e) => setNewRpc(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" 
                    onClick={() => {
                        addRPC(newRPC);
                        setNewRpc('');
                        onClose()}}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>

            </Modal>
        </div>
    </>
    )
}