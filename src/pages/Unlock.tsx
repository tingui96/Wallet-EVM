import { useToast, Box,Input,InputGroup,Stack,InputRightElement,Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import Web3 from "web3";

export const Unlock = () => {
    const [password,setPassword] = useState('');
    const toast = useToast();
    //variables para guardar las Llaves
    const web3 = new Web3();

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show); 

    const Aceptar = () => {
        
            web3.eth.accounts.decrypt('encryptText',password).
        catch( err =>
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            }))
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