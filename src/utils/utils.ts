import { sha256 } from "ethers"
import { RPC, Token, TokensList } from "../types"
import { hexRegex } from "../const"

export const addToTokens = (tokenList:TokensList[],defaultRPC:number,token:Token):TokensList[] => {
    const newList = structuredClone(tokenList)
    newList[defaultRPC].push(token)
    return newList
}
export const removeToken = (tokenList:TokensList[],defaultRPC:number,index:number):TokensList[] => {
    const newList = structuredClone(tokenList)
    newList[defaultRPC].splice(index,1)
    return newList
}

export const updateTokenBalance = (tokenList:TokensList[],defaultRPC:number,token:Token) => {
    let newRPCList = structuredClone(tokenList)
    for (let i = 0; i < newRPCList[defaultRPC].length; i++) {
        const element = newRPCList[defaultRPC][i];
        if(element.address === token.address)
        {
            newRPCList[defaultRPC][i].balance = token.balance
        }  
    }
    return newRPCList
}

export const addToRPCs = (rpcs:RPC[],rpc:RPC):RPC[] => {
    const newRpcs = structuredClone(rpcs)
    newRpcs.push(rpc)
    return newRpcs
}
export const addTokenList = (tokenList:TokensList[]):TokensList[] => {
    const newRpcs = structuredClone(tokenList)
    newRpcs.push([])
    return newRpcs
}
export const removeTokenfromTokenList = (tokenList:TokensList[],index:number):TokensList[] => {
    const newRpcs = structuredClone(tokenList)
    newRpcs.splice(index,1)
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