import { CardFooter, Button, Input, Link } from "@nextui-org/react";
import React, { SetStateAction, useEffect, useState} from "react";

type Props = {
    setMnemonic: (string:SetStateAction<string>) => void
    setPassword: (string:SetStateAction<string>) => void
    goNext: ()=> void
}
export const Password: React.FC<Props> = ({setPassword,goNext}) => {
    const [isVisible] = useState(false);
    const [password,setPass] = useState('');
    const [isValidPassword, setValidPassword] = useState(false)
    const [isInvalidLength,setIsValidLength] = useState(false)
    const [confpassword,setConfPassword] = useState('');
    const [loading,setLoading] = useState(false)
    //variables para guardar las Llaves

    const HandleContinueOnClick = async() => {
        setLoading(true)
        setPassword(password)
        setLoading(false)
        goNext()
    };

    useEffect(() => {
        if (password === "")
            setValidPassword(false);
        (password === confpassword) ? setValidPassword(true) : setValidPassword(false);
      }, [password,confpassword])

    useEffect(() => {
        if(password.length === 0) setIsValidLength(true);
        (password.length < 8) ? setIsValidLength(false) : setIsValidLength(true)
    },[password])

    return (
        <>
                <div className="flex flex-col justify-center justify-items-center gap-4">
                    <Input label="Password" variant="bordered" placeholder="Enter your password"
                      type={isVisible ? "text" : "password"}
                      className=" max-w-full"
                      isInvalid={!isInvalidLength}
                      color={!isInvalidLength ? "danger" : "default"}
                      onChange={(e) => setPass(e.target.value)}
                      />
                    <Input label="Confirm Password" variant="bordered" placeholder="Confirm your Password"                   
                      type={isVisible ? "text" : "password"}
                      className="max-w-full"
                      onChange={(e) => setConfPassword(e.target.value)}
                      isInvalid={!isValidPassword}
                      color={!isValidPassword ? "danger" : "default"}
                      />
                </div>
            <CardFooter className="flex justify-between">
                <Button as={Link} href="/" radius="full" 
                    className="btn-gradient text-white">
                        Back
                    </Button>
                <Button isLoading={loading} isDisabled={!isInvalidLength||!isValidPassword} radius="full" 
                    className="btn-gradient text-white"
                    onClick={HandleContinueOnClick}>
                        Continue
                </Button>           
            </CardFooter>
    </>
    );
}