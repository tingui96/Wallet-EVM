import { sha256 } from "ethers"
import { Token } from "../types"

export const addToTokens = (tokenList:Token[],token:Token):Token[] => {
    const newList = structuredClone(tokenList)
    newList.push(token)
    return newList
}
export const removeToken = (tokenList:Token[],index:number):Token[] => {
    const newList = structuredClone(tokenList)
    tokenList.splice(index,1)
    return newList
}

export const addToRPCs = (rpcs:string[],url:string):string[] => {
    const newRpcs = structuredClone(rpcs)
    newRpcs.push(url)
    return newRpcs
}


export const removeToRPCs = (rpcs:string[],index:number):string[] => {
    const newRpcs = structuredClone(rpcs)
    newRpcs.splice(index,1)
    return newRpcs
}

export const validatePassword = (password:string,confirmPassword:string) => password === confirmPassword

export function calcularSHA256(data:string) {
    const hash = sha256('0x'+ data);
    return hash
}