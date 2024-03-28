import { calcularSHA256 } from "../utils/utils"

export const GetPassWordHash = () =>
{
    let pass = localStorage.getItem('password')
    return pass
}

export const SavePassword = (password:string) => {
    const hashedPass = calcularSHA256(password)
    localStorage.setItem('password',hashedPass)
}

export const ClearPassword = () => {
    localStorage.removeItem('password')
}