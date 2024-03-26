import { Card,CardBody,CardHeader, CardFooter, Button, Input } from "@nextui-org/react";
import { useMemo, useState} from "react";
import { createAccount, validatePassword } from "../utils/utils";
import { useAccount } from "../store/useAccount";
import {  Navigate } from "react-router-dom";
export const Password = () => {
    const [isVisible] = useState(false);
    const [password,setPassword] = useState('');
    const [confpassword,setConfPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const {account,setAccount} = useAccount()
    //variables para guardar las Llaves

    const HandleContinueOnClick = async() => {
        setLoading(true)
        let account = await createAccount(password);
        account.saved = true
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
        <>
        { account && <Navigate to='/' replace/>}
        <Card className="max-w-full">
            <CardHeader className="flex justify-center items-center text-red-900">
                <p>Set your password</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-4">
                    <Input label="Password" variant="bordered" placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      className="max-w-xs"
                      isInvalid={isInvalidLength}
                      color={isInvalidLength ? "danger" : "default"}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                    <Input label="Confirm Password" variant="bordered" placeholder="Confirm your Password"                   
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
    </>
    );
}