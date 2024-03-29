import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useAccount } from "../../store/useAccount"
import { saveAs } from 'file-saver';

export const Exportar = () => {
    const [fileName,setFileName] = useState('')
    const {account} = useAccount()

    const onClickExport = () => {
        const data = new Blob([JSON.stringify(account)],{ type: 'text/plain;charset= utf-8' })
        saveAs(data,fileName + '.pk')
    }
    return(<>
        <div className="font font-semibold text-lg text-orange-800 flex justify-center">
            Exportar cuenta
        </div>
        <div className="flex justify-center align-middle gap-3">
            <Input type="text" placeholder="Nombre del archivo (.pk)" 
                value={fileName} onChange={(e)=> setFileName(e.target.value)}/>
            <Button className="btn-gradient text-white"
                onClick={() => onClickExport()}>guardar</Button>
        </div>
    </>)
}