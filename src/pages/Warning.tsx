import { useToast, Box,InputGroup,Stack,InputRightElement } from "@chakra-ui/react";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { Card,CardBody,CardHeader, CardFooter, Button, Input } from "@nextui-org/react";
import {ChangeEvent, useMemo, useState} from "react";
import Web3 from "web3";
import { createAccount, validatePassword } from "../utils/utils";
import { useAccount } from "../store/useAccount";
export const Warning = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [password,setPassword] = useState('');
    const [confpassword,setConfPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const {setAccount} = useAccount()
    //variables para guardar las Llaves

    const HandleContinueOnClick = async() => {
        setLoading(true)
        let account = await createAccount(password);
        setAccount(account)
        setLoading(false)
    };

    const notMatchPassword = useMemo(() => {
        if (password === "") return false
        return validatePassword(password,confpassword) ? false : true;
      }, [password,confpassword])

    const isInvalidLength = useMemo(() => {
        if(password.length === 0) return true
        if(password.length < 8) return true
    },[password])

    return (
        <Card className="max-w-full">
            <CardHeader className="flex justify-center items-center text-red-900">
                <p>Set your password</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-4">
                    <Input label="Password" variant="bordered" placeholder="Enter your password"
                      endContent={
                          isVisible ? (
                            <button onClick={toggleVisibility}>
                               <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            </button>
                            ) : (
                            <button onClick={toggleVisibility}>
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            </button>
                          )}
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs"
                      isInvalid={isInvalidLength}
                      color={isInvalidLength ? "danger" : "default"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input label="ConfirmPassword" variant="bordered" placeholder="Enter your confirmation"
                      endContent={                        
                          isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}                     
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs"
                      onChange={(e) => setConfPassword(e.target.value)}
                      isInvalid={notMatchPassword}
                      color={notMatchPassword ? "danger" : "default"}
                    />
                </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-2">
                <Button isLoading={loading} isDisabled={isInvalidLength||notMatchPassword} fullWidth radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    onClick={HandleContinueOnClick}>
                        Continue
                    </Button>           
            </CardFooter>
    </Card>
    );
}