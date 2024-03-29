import { generateMnemonic } from "bip39";
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