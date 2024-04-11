import { sha256 } from "ethers"
import { RPC, Token, TokensList } from "../types"
import { hexRegex } from "../const"

export const addToTokens = (tokenList:TokensList[],defaultRPC:number,token:Token):TokensList[] => {
    tokenList[defaultRPC].push(token)
    return tokenList
}
export const removeToken = (tokenList:TokensList[],defaultRPC:number,index:number):TokensList[] => {
    const newList = structuredClone(tokenList)
    newList[defaultRPC].splice(index,1)
    return newList
}

export const updateTokenBalance = (tokenList:TokensList[],defaultRPC:number,token:Token) => {
    let newRPCList = tokenList.map((element,index) => {
        if(index === defaultRPC)
        {
            return tokenList[defaultRPC].map((value) => {
                if(value.address === token.address) return token
                else return value
            })
        }
        else return element
    })
    return newRPCList
}

export const addToRPCs = (rpcs:RPC[],rpc:RPC):RPC[] => {
    rpcs.push(rpc)
    return rpcs
}
export const addTokenList = (tokenList:TokensList[]):TokensList[] => {
    tokenList.push([])
    return tokenList
}
export const removeTokenfromTokenList = (tokenList:TokensList[],index:number):TokensList[] => {
    return tokenList.splice(index,1)
}

export const removeToRPCs = (rpcs:RPC[],index:number):RPC[] => {
    return rpcs.splice(index,1)
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