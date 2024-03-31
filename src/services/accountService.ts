import { generateMnemonic } from "bip39";
import { Contract } from "ethers";
import { Wallet, ethers } from "ethers";

export const MnemonicToPrivateKey = (mnemonicPhrase:string) =>{
    const account = Wallet.fromPhrase(mnemonicPhrase);
    return account
}

export const createAccount = async () => {
    const mnemonic = generateMnemonic()  
    return mnemonic
}

export const getBalance = async(rpc:string,address:string) => {
    const provider = new ethers.JsonRpcProvider(rpc)
    const balanceWei = await provider.getBalance('0x'+ address);
    const balanceEth = ethers.formatEther(balanceWei);
    return balanceEth
}

export const getToken = async(rpc:string,contract:string,address:string|undefined) => {
    const provider = new ethers.JsonRpcProvider(rpc)
    const abi = ['function decimals() view returns (uint8)', 'function symbol() view returns (string)', 'function balanceOf(address) view returns (uint256)']
    try{
        const token = new Contract(contract,abi,provider)
        const decimals = await token.decimals();
        const symbol = await token.symbol();
        const balanceOf = await token.balanceOf('0x'+ address)
        
        return {address: contract, simbol: symbol, decimals:decimals.toString(), balance: balanceOf.toString() }
    }
    catch(err){
        return null
    }
}