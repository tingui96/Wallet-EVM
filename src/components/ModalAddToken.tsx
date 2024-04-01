import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { getToken } from "../services/accountService"
import { useRPC } from "../store/useRPC"
import { Token } from "../types"
import { useAccount } from "../store/useAccount"

type Props = {
    isOpen: boolean
    onClose: () => void
    addToken: (token:Token) => void
}

export const ModalAddToken: React.FC<Props> = ({isOpen,onClose,addToken}) => {
    const {account} = useAccount()
    const [contractToAdd, setContractToAdd] = useState<Token>({address: '', simbol: '', decimals:'', balance: '' });
    const {defaultRPC,rpcs} = useRPC()

    useEffect(() => {
        async function fetchToken() {
            const token = await getToken(rpcs[defaultRPC],contractToAdd.address,account?.keystore.address)
            if(token) setContractToAdd(token)
        }
        fetchToken()
    },[contractToAdd.address])
    const AddToken = () => {
        addToken(contractToAdd)
        onClose()
    }
    return(<>
        <Modal className="p-3" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex justify-center text-xl font-bold text-orange-700">Agreagar token</ModalHeader>
            <ModalBody >
                <div className="grid justify-center gap-3">          
                   <div>
                       <Input type="text"
                            isRequired
                            label='Dirección del contrato' 
                            onChange={(e) => setContractToAdd(
                                {
                                    address: e.target.value,
                                    simbol: '',
                                    decimals: '',
                                    balance: '' 
                                })}/>
                    </div>
                   <div>
                      <Input isReadOnly type="text" value={contractToAdd.simbol} label="Símbolo"/>
                   </div>
                   <div>
                      <Input isReadOnly type="text" value={contractToAdd.decimals.toString()} label="Decimales"/>
                   </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={contractToAdd.simbol === ''} className="btn-gradient text-white rounded-full" onClick={AddToken}>Agregar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    
    </>)
}