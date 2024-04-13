import { Button, Link } from "@nextui-org/react"
import Confetti from 'react-confetti';

export const Congratz = () => {
    return(
        <>
        <div className="grid justify-items-center gap-3 p-6">
            <div className="flex">
                <div className="text-3xl font-sans font-extrabold text-orange-500">Felicidades</div>
                <Confetti className="rounded-lg w-full h-full"/>
            </div>
            <div className="flex">
                <div className="font-bold text-base text-gray-800">Has creado correctamente tu billetera</div>
            </div>
        </div>

        <Button as={Link} href="/" className="btn-gradient text-white">Continuar</Button>
        </>
    )
}