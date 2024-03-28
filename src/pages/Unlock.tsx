import { useToast, Box,Input,InputGroup,Stack,InputRightElement,Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useAccount } from "../store/useAccount";
import { GetPassWord } from "../storage/passwordStorage";
import { calcularSHA256 } from "../utils/utils";
import { SaveAccount } from "../storage/accountStorage";

export const Unlock = () => {
    const {account,setAccount} = useAccount()
    const hashedPass = GetPassWord()
    const [password,setPassword] = useState('');
    const toast = useToast();
    //variables para guardar las Llaves

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show); 

    const Aceptar = () => {
        const newHashedPass = calcularSHA256(password)
        if(newHashedPass === hashedPass && account)
        {
            let newAccount = structuredClone(account)
            newAccount.hasPass.value = true
            SaveAccount(newAccount)
            setAccount(newAccount)
        }
        toast({
            title: 'Error',
            description: 'Password does not match',
            status: 'error',
            duration: 5000,
            isClosable: true
        })
    }

    return(
        <Box display="flex" justifyContent="center" width="100%"
                  maxWidth="600px" borderWidth="1px" p={6}>
                  <Stack width="100%" maxWidth="600px" justifyContent="center">
                    <InputGroup size='md'>
                    <Input pr='4.5rem' type={show ? 'text' : 'password'} 
                        placeholder='Enter password' onChange={handlePasswordChange}/>
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                         {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button mt={5} alignContent="center" colorScheme="green"
                    onClick={Aceptar}>Aceptar </Button>
                    
                  </Stack>
              </Box>
    )
};