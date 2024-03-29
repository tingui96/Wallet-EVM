import {ChangeEvent,  useRef, useState} from "react";
import { useToast } from "@chakra-ui/react"; 
import { useAccount } from "../store/useAccount.js";
import { Card,CardHeader, CardBody, Link, Button } from "@nextui-org/react";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Navigate } from "react-router-dom";
import { Account } from "../types.js";

export const Init = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast()
    const {account, setAccount} = useAccount()
    const [showImport,setShowImport] = useState(false);
    const [loading,setLoading] = useState(false) 
      
    const readFile = (e:ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if(!e.target.files) return;
        const file:File|null = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file,'text/plain;charset= utf-8');
        fileReader.onloadend = () => {  
                try{     
                    if(typeof fileReader.result === 'string' )
                    {
                        const blob = new Blob([fileReader.result],{ type: 'text/plain;charset= utf-8' })      
                        blob.text().then(res => {
                            let newAccount:Account = JSON.parse(res)
                            setLoading(false)
                            setAccount(newAccount)            
                        })
                    }
                    console.log(3)
                }
                catch (error){
                    console.log(error)
                    toast({
                        title: 'Advertencia',
                        description: "El archivo no es compatible",
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    })
                    setLoading(false)
                }
                   
        };
        
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
                <div className={showImport ? 'mb-4' : 'mb-4 hidden'} >
                    <div className="grid justify-items-center p-3 gap-3" >
                        <div className="font font-semibold">Importar cuenta (.pk) <span className="font text-red-700">*</span></div> 
                        <input hidden type="file" ref={fileInputRef} multiple={false} onChange={ readFile }/>
                        <Button className="btn-gradient text-white" isLoading={loading}
                            onClick={() => fileInputRef.current?.click()}>Importar </Button>
                    </div>
                    <div className="grid justify-items-center gap-3">
                        <div className="font font-mono">"Nunca compartas la llave privada."</div>    
                    </div>
                </div>
            </CardBody>     
        </Card>
    </>
    ); 
}