import { sha256 } from "ethers"
import { RPC, Token } from "../types"
import { hexRegex } from "../const"

export const addToTokens = (rpcs:RPC[],defaultRPC:number,token:Token):RPC[] => {
    const newList = structuredClone(rpcs)
    newList[defaultRPC].tokenList.push(token)
    return newList
}
export const removeToken = (rpcs:RPC[],defaultRPC:number,index:number):RPC[] => {
    const newList = structuredClone(rpcs)
    newList[defaultRPC].tokenList.splice(index,1)
    return newList
}

export const addToRPCs = (rpcs:RPC[],rpc:RPC):RPC[] => {
    const newRpcs = structuredClone(rpcs)
    newRpcs.push(rpc)
    return newRpcs
}


export const removeToRPCs = (rpcs:RPC[],index:number):RPC[] => {
    const newRpcs = structuredClone(rpcs)
    newRpcs.splice(index,1)
    return newRpcs
}
export const verifyRemoveDefault = (defaultRPC:number,index:number) :number => {
    if(defaultRPC === index) return 0
    else return defaultRPC
}

export const validatePassword = (password:string,confirmPassword:string) => password === confirmPassword

export function calcularSHA256(data:string) {
    const hash = sha256('0x'+ data);
    return hash
}

export function IsValidAddress(address:string)
{
    if (!address.startsWith("0x")) {
        return false;
    }
    if (address.length !== 42) {
        return false;
    }
    
    if (!hexRegex.test(address)) {
        return false;
    }
    return true;
}