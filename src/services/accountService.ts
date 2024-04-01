import { generateMnemonic } from "bip39";
import { Contract, decryptKeystoreJson } from "ethers";
import { Wallet, ethers } from "ethers";
import { Account, RPC, Token } from "../types";
import { ABI } from "../const";

export const MnemonicToPrivateKey = (mnemonicPhrase:string) =>{
    const account = Wallet.fromPhrase(mnemonicPhrase);
    return account
}

export const createAccount = async () => {
    const mnemonic = generateMnemonic()  
    return mnemonic
}

export const getBalance = async(rpc:RPC,address:string) => {
    const provider = new ethers.JsonRpcProvider(rpc.url)
    const balanceWei = await provider.getBalance('0x'+ address);
    const balanceEth = ethers.formatEther(balanceWei);
    return balanceEth
}

export const getToken = async(rpc:RPC,contract:string,address:string|undefined) => {
    const provider = new ethers.JsonRpcProvider(rpc.url)
    try{
        const token = new Contract(contract,ABI,provider)
        const decimals = await token.decimals();
        const symbol = await token.symbol();
        const balanceOf = await token.balanceOf('0x'+ address)
        
        return {address: contract, simbol: symbol, decimals:decimals.toString(), balance: balanceOf.toString() }
    }
    catch(err){
        return null
    }
}
export const fetchAllTokenBalance = async(defaultRPC:number,rpcs:RPC[],address:string) => {
    let newTokenList = structuredClone(rpcs)
    for (let index = 0; index < newTokenList[defaultRPC].tokenList.length; index++) {
        newTokenList[defaultRPC].tokenList[index].balance = await getTokenBalance(newTokenList[defaultRPC],newTokenList[defaultRPC].tokenList[index].address,address)
    }
    return newTokenList
}

export const getTokenBalance = async(rpc:RPC,contract:string,address:string|undefined) => {
    const provider = new ethers.JsonRpcProvider(rpc.url)
    try{
        const token = new Contract(contract,ABI,provider)
        const balanceOf = await token.balanceOf('0x'+ address)
        
        return balanceOf.toString() 
    }
    catch(err){
        return null
    }
}
export const VerifyPassword = async(account:Account,password:string) => {
    let fin = 0
    await decryptKeystoreJson(JSON.stringify(account.keystore),password,(a) => fin = a)
    return fin===1
}

export const SendToken = async(account:Account,password:string,rpc:RPC,token:Token,recipientAddress:string,cantidad:string) => {
    const provider = new ethers.JsonRpcProvider(rpc.url)
    const keystore = await decryptKeystoreJson(JSON.stringify(account.keystore),password)
    const wallet = new ethers.Wallet(keystore.privateKey, provider);
    const erc20Contract = new Contract(token.address,ABI,wallet)
    const amount = ethers.parseUnits(cantidad, ethers.toBigInt(token.decimals));
    try {
        const tx = await erc20Contract.transfer(recipientAddress, amount);
        await tx.wait(); // Espera a que la transacción se confirme
        return {response:true,tx:tx}
    } catch (error) {
        return {response:false,tx:'Error al transferir' + error}
    }
    
}