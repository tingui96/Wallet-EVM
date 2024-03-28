import { generateMnemonic } from "bip39";
import { Wallet } from "ethers";

export const MnemonicToPrivateKey = (mnemonicPhrase:string) =>{
    const account = Wallet.fromPhrase(mnemonicPhrase);
    return account
}

export const createAccount = async () => {
    const mnemonic = generateMnemonic()  
    return mnemonic
}