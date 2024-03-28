import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

export const Congratz = () => {
    const navigate = useNavigate()
    const HandleOnClick = () => {
        navigate('/dashboard')
    }

    return(
        <>
        <div className="flex justify-center p-6">Felicidades</div>
        <Button onClick={HandleOnClick} className="btn-gradient">Continuar</Button>
        </>
    )
}