import Web3 from "web3"
import { Account, Token } from "../types"

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

export const createAccount = async (password:string) => {
    const web3 = new Web3();
    const wallet = web3.eth.accounts.create();
    const secret = wallet.privateKey;
    const publicKey = wallet.address;
    const response = await web3.eth.accounts.encrypt(secret,password).then( res => {
        const newAccount:Account = {
            privateKey: res,
            publicKey: publicKey,
            saved: false,
            hasPass: { value: true , fecha: 0 }
        }
        return newAccount
    })
    return response
}
export const importAccount = (encryptText:string,password:string) => {
    const web3 = new Web3();
    let newAccount: Account;
    web3.eth.accounts.decrypt(encryptText,password).then(res => {
         newAccount.publicKey = res.address
         return res.encrypt(password)
        }).then(key => {
            newAccount.privateKey = key 
        })
}

export const validatePassword = (password:string,confirmPassword:string) => password === confirmPassword