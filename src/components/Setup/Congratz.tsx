import { Button, Link } from "@nextui-org/react"

export const Congratz = () => {
    return(
        <>
        <div className="flex justify-center p-6">Felicidades</div>
        <Button as={Link} href="/" className="btn-gradient">Continuar</Button>
        </>
    )
}