import {ChangeEvent, SetStateAction, useState} from "react";
import { Heading, Text, Button, useToast, FormControl, FormLabel, FormHelperText,
     Input, InputGroup, InputRightElement, Divider
} from "@chakra-ui/react"; 
import { useAccount } from "../store/useAccount.js";
import { Account } from "../types.js";
import { Link } from "@nextui-org/react";

export const Setup = () => {
    const toast = useToast();
    const [password, setPassword] = useState('');
    const {setAccount} = useAccount();
    const [showImport,setShowImport] = useState(false);
    const [show, setShow] = useState(false);    
    const [encryptText, setEncryptText] = useState<string>("")

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const importAccount = () => {
        if(password.length>7)
        {
            if(encryptText==="")
            { toast({
                    title: 'Advertencia',
                    description: "Debe elegir algun archivo",
                    status: 'info',
                    duration: 5000,
                    isClosable: true
                })
            }
            else
            {
                const Web3 = require('web3');
                const web3 = new Web3();
                try{
                    const account = web3.eth.accounts.decrypt(encryptText,password);
                    const newAccount: Account = JSON.parse(account)
                    setAccount(newAccount)
                }
                catch{
                    toast({
                        title: 'Error',
                        description: "La contraseña para esa llave privada no es correcta",
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    })
                }               
            }
        }
        else
        {
            toast({
                title: 'Error',
                description: "La contraseña debe ser mayor de 8 caracteres.",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }

    };   
    const readFile = (e:any) => {
        const file = e.target.files[0];
        if(file) return;
        const fileReader = new FileReader();
        fileReader.readAsText(file);

        fileReader.onload = () => {            
            setEncryptText(fileReader.result as SetStateAction<string>);
        };
    }
    return(
        <div>
            <Heading>Bienvenido a tu Billetera</Heading>            
            <Text fontSize="xl">Crea tu cuenta de forma rapida y segura</Text>
            <Button as={Link} href="/setPass" size="lg" colorScheme="blue" 
            mt={5}>Crear Cuenta</Button>

            <Text mt={5}>O bien, si ya tienes una cuenta, importala</Text>                        
            <Button mt={5} alignContent="center" colorScheme="green"
                hidden={showImport} 
                onClick={() => setShowImport(true)} >Importar </Button>
            <Divider orientation='horizontal' />

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
                        <Button h='1.75rem' size='sm'
                         onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormHelperText>Nunca compartas la llave privada.</FormHelperText>
                <Button mt={5} alignContent="center" colorScheme="green"
                    onClick={importAccount}>Importar </Button>
            </FormControl>
            
        </div>
            
    ); 
}