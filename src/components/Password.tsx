import { CardFooter, Button, Input, Link } from "@nextui-org/react";
import React, { SetStateAction, useMemo, useState} from "react";
import { validatePassword } from "../utils/utils";
import { SavePassword } from "../storage/passwordStorage";
import { createAccount } from "../services/accountService";

type Props = {
    setMnemonic: (string:SetStateAction<string>) => void
    setPassword: (string:SetStateAction<string>) => void
    goNext: ()=> void
}
export const Password: React.FC<Props> = ({setMnemonic,setPassword,goNext}) => {
    const [isVisible] = useState(false);
    const [password,setPass] = useState('');
    const [confpassword,setConfPassword] = useState('');
    const [loading,setLoading] = useState(false)
    //variables para guardar las Llaves

    const HandleContinueOnClick = async() => {
        setLoading(true)
        let account = await createAccount();
        SavePassword(password)
        setPassword(password)
        setMnemonic(account)
        setLoading(false)
        goNext()
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
                <div className="flex flex-col justify-center justify-items-center gap-4">
                    <Input label="Password" variant="bordered" placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      className=" max-w-full"
                      isInvalid={isInvalidLength}
                      color={isInvalidLength ? "danger" : "default"}
                      onChange={(e) => setPass(e.target.value)}
                      />
                    <Input label="Confirm Password" variant="bordered" placeholder="Confirm your Password"                   
                      type={isVisible ? "text" : "password"}
                      className="max-w-full"
                      onChange={(e) => setConfPassword(e.target.value)}
                      isInvalid={notMatchPassword}
                      color={notMatchPassword ? "danger" : "default"}
                      />
                </div>
            <CardFooter className="flex justify-between">
                <Button as={Link} href="/" radius="full" 
                    className="btn-gradient text-white">
                        Back
                    </Button>
                <Button isLoading={loading} isDisabled={isInvalidLength||notMatchPassword} radius="full" 
                    className="btn-gradient text-white"
                    onClick={HandleContinueOnClick}>
                        Continue
                </Button>           
            </CardFooter>
    </>
    );
}