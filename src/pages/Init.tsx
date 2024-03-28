import {ChangeEvent, useState} from "react";
import { useToast, FormControl, FormLabel, FormHelperText,
     Input, InputGroup, InputRightElement,
} from "@chakra-ui/react"; 
import { useAccount } from "../store/useAccount.js";
import { Card,CardHeader, CardBody, Link, Button } from "@nextui-org/react";
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
    const [encryptText, setEncryptText] = useState<string>("")

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const importAccount = () => {
        

    };   
    const readFile = (e:any) => {
       
    }
    return(
        <>
        {account && <Navigate to='/dashboard' replace/>}
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
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                            <LibraryAddIcon/>
                        </Button>
                        <div className="text text-justify font-serif">Crear cuenta nueva</div>
                    </div>
                    <div className="grid m-5 justify-items-center">
                        <Button as={Link} size='lg' isIconOnly
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" 
                            onClick={() => setShowImport(true)} ><SystemUpdateAltIcon/> </Button>
                        <div className="text text-center font-serif mt-3">Importar una cuenta</div>                        
                    </div>
                </div>
                <FormControl hidden={!showImport} isRequired>
                    <FormLabel mt={5}>Importar llave privada</FormLabel> 
                    <Input type="file" multiple={false} onChange={ readFile }/>
                </FormControl>

                <FormControl hidden={!showImport} isRequired>
                    <FormLabel mt={3}>Contraseña para desencriptar archivo.</FormLabel>
                    <InputGroup size='md'>
                        <Input pr='4.5rem' type={show ? 'text' : 'password'} 
                            placeholder='Enter password' onChange={handlePasswordChange}/>
                        <InputRightElement width='4.5rem'>
                            <Button size='sm'
                             onClick={() => setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText>Nunca compartas la llave privada.</FormHelperText>
                    <Button onClick={importAccount}>Importar </Button>
                </FormControl>
            </CardBody>     
        </Card>
    </>
    ); 
}