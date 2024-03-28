import { useToast} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useAccount } from "../store/useAccount";
import { GetPassWordHash } from "../storage/passwordStorage";
import { calcularSHA256 } from "../utils/utils";
import { SaveAccount } from "../storage/accountStorage";
import { Card, CardBody, CardHeader, CardFooter, Input, Button } from "@nextui-org/react";

export const Unlock = () => {
    const {account,setAccount} = useAccount()
    const hashedPass = GetPassWordHash()
    const [password,setPassword] = useState('');
    const toast = useToast();
    //variables para guardar las Llaves

    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const [show] = useState(false);

    const Aceptar = () => {
        const newHashedPass = calcularSHA256(password)
        if(newHashedPass === hashedPass && account)
        {
            let newAccount = structuredClone(account)
            newAccount.hasPass.value = true
            SaveAccount(newAccount)
            setAccount(newAccount)
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