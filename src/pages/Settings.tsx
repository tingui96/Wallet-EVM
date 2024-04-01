import { Card,CardBody, CardHeader, CardFooter, Button, Link } from "@nextui-org/react"
import { useState } from "react"
import { ViewConfigPage } from "../const"
import { ViewConfig } from "../types"
import { Configuration } from "../components/Configuration/Configuration"
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { RPC } from "../components/Configuration/RPC"
import { Exportar } from "../components/Configuration/Exportar"
import { useAccount } from "../store/useAccount"
import { Navigate } from "react-router-dom"



export const Settings = () => {
    const [viewConfig,setViewConfig] = useState<ViewConfig>(ViewConfigPage.INDEX)
    const {account} = useAccount()
    return(
        <>
            {!account && <Navigate to="/" replace/>}
            <Card className="p-3">
                <CardHeader className="justify-center max-w-[340px]">
                    <div className="font font-bold text-2xl text-orange-800">
                        Configuración
                    </div>
                </CardHeader>
                <CardBody className="gap-3">
                    {viewConfig === ViewConfigPage.INDEX && <Configuration setViewConfig={setViewConfig}/>}
                    {viewConfig === ViewConfigPage.RPC && <RPC/>}
                    {viewConfig === ViewConfigPage.EXPORT && <Exportar/>}
                </CardBody>
                <CardFooter className="flex justify-center">
                    { viewConfig !== ViewConfigPage.INDEX && <Button onClick={() => setViewConfig(ViewConfigPage.INDEX)}
                        className="btn-gradient text-white">
                            <FirstPageIcon/> Atrás
                        </Button>
                    }
                    { viewConfig === ViewConfigPage.INDEX && <Button as={Link} href="/"
                        className="btn-gradient text-white">
                            <FirstPageIcon/> Atrás
                        </Button>
                    }
                </CardFooter>
            </Card>
        
        </>
    )
}