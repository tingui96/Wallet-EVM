import { useToast} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useAccount } from "../store/useAccount";
import { SaveAccount } from "../storage/accountStorage";
import { Card, CardBody, CardHeader, CardFooter, Input, Button } from "@nextui-org/react";
import { VerifyPassword } from "../services/accountService";

export const Unlock = () => {
    const {account,setAccount} = useAccount()
    const [password,setPassword] = useState('');
    const toast = useToast();
    //variables para guardar las Llaves

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const [show] = useState(false);

    const Aceptar = async() => {
        if(account && (await VerifyPassword(account,password)))
        {
            let newAccount = structuredClone(account)
            newAccount.hasPass.value = true
            SaveAccount(newAccount)
            setAccount(newAccount)
            setPassword('')
        }
        else
        {
            toast({
                title: 'Error',
                description: 'Password does not match',
                status: 'error',
                duration: 5000,
                isClosable: true
            })
            return
        }
        
    }

    return(
        <Card className="flex p-3">
            <CardHeader className="justify-center">
                <div className="font font-bold text-xl text-orange-900">Desbloquee su billetera</div>
            </CardHeader>
            <CardBody>
                <Input className="border-1 rounded-xl border-orange-900" type={show ? 'text' : 'password'} 
                    placeholder='Enter password' onChange={handlePasswordChange}/>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Button className="btn-gradient text-white"
                        onClick={Aceptar}>Aceptar </Button>
            </CardFooter>
        </Card>
    )
};