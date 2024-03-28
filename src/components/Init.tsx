import {ChangeEvent, useState} from "react";
import { useToast } from "@chakra-ui/react"; 
import { useAccount } from "../store/useAccount.js";
import { Card,CardHeader, CardBody, Link, Button, Input } from "@nextui-org/react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Navigate } from "react-router-dom";

export const Init = () => {
    const toast = useToast();
    const [password, setPassword] = useState('');
    const {account} = useAccount()
    console.log(account)
    const [showImport,setShowImport] = useState(false);
    const [show, setShow] = useState(false);    
    const [encryptText, setEncryptText] = useState("")

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const importAccount = () => {
        

    };   
    const readFile = (e:any) => {
       
    }
    return(
        <>
        {account && <Navigate to='/'/>}
        <Card className="max-w-[400px]">
            <CardHeader className="grid justify-items-center">
                <h1 className="text-4xl text-orange-900 m-5">
                    Bienvenido a tu Billetera
                </h1>
                <h2 className="text text-wrap text-lg font-serif ml-10 mr-10">
                    Crea tu cuenta de forma rapida y segura
                </h2>
            </CardHeader>            
            <CardBody className="flex justify-items-center">
                <div className="grid grid-cols-2 justify-center justify-items-center gap-3">
                    <div className="grid m-5 justify-items-center">
                        <Button isIconOnly as={Link} href="/setup" size="lg" 
                            className="btn-gradient text-white">
                            <LibraryAddIcon/>
                        </Button>
                        <div className="text text-justify font-serif">Crear cuenta nueva</div>
                    </div>
                    <div className="grid m-5 justify-items-center">
                        <Button as={Link} size='lg' isIconOnly
                            className="btn-gradient text-white" 
                            onClick={() => setShowImport(true)} ><SystemUpdateAltIcon/> </Button>
                        <div className="text text-center font-serif mt-3">Importar una cuenta</div>                        
                    </div>
                </div>
                <div className="mb-4">
                    <div className="grid justify-items-center p-3 gap-3" >
                        <div className="font font-semibold">Importar llave privada <span className="font text-red-700">*</span></div> 
                        <Input className="flex justify-items-center max-w-60" type="file" multiple={false} onChange={ readFile }/>
                    </div>

                    <div className="grid justify-items-center gap-3">
                        <div className="font font-semibold">Contraseña para desencriptar archivo <span className="font text-red-700">*</span></div>
                        <Input className="flex justify-items-center max-w-60" type={show ? 'text' : 'password'} 
                                placeholder='Enter password' onChange={handlePasswordChange}/>
                        <div className="font font-mono">Nunca compartas la llave privada.</div>
                        <Button className="btn-gradient text-white" onClick={importAccount}>Importar </Button>
                    </div>
                </div>
            </CardBody>     
        </Card>
    </>
    ); 
}