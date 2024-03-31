import { type KeystoreAccount } from "ethers"
import { ViewConfigPage } from "./const"

export interface Account {
    keystore: KeystoreAccount
    hasPass : IHasPassword
}
export interface IHasPassword {
    value: boolean
    fecha: number
}

interface AccountState {
    account: Account |null
    setAccount: (account:Account|null) => void
    ClearAccount: () => void
}

interface RpcState {
    defaultRPC : string
    rpcs: string[]
    selectRPC: (index:number) => void
    addRPC: (url:string) => void
    removeRPC: (index: number) => void
}

interface TokenState {
    tokenList: Token[]
    addToken: (token:Token) => void
    removeToken: (index: number) => void
}

type RPC = {
    defaultRPC : string
    rpcs: string[]
}

export interface Token {
    address: string
    decimals: string
    simbol: string
    balance: string
}

type ViewConfig = keyof ViewConfigPage