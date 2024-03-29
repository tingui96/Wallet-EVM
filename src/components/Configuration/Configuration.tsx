import { Button } from "@nextui-org/react"
import React from "react"
import { ViewConfig } from "../../types"
import { ViewConfigPage } from "../../const"

type Props = {
    setViewConfig: (value:ViewConfig) => void
}
export const Configuration: React.FC<Props> = ({setViewConfig}) => {
    return(
        <>
            <div className="flex justify-center">
                <Button onClick={()=> {setViewConfig(ViewConfigPage.RPC)}} radius="full"
                 className="btn-gradient text-white w-full">Rpc</Button>
            </div>
            <div className="flex justify-center">
                <Button onClick={()=> {setViewConfig(ViewConfigPage.EXPORT)}} radius="full"
                 className="btn-gradient text-white w-full">Exportar cuenta</Button>
            </div>      
        </>
    )
}