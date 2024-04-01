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
    defaultRPC : number
    rpcs: RPC[]
    selectRPC: (index:number) => void
    addRPC: (rpc:RPC) => void
    removeRPC: (index: number) => void
    ClearRPC: () => void
    updateTokenList: (newTokenList:RPC[]) => void
    addToken: (token:Token) => void
    removeToken: (index: number) => void
}

interface TokenState {
    tokenList: Token[]
    updateTokenList: (newTokenList:Token[]) => void
    addToken: (token:Token) => void
    removeToken: (index: number) => void
}

type RPC = {
    name: string
    url: string
    tokenList: Token[]
}

type RpcType = {
    defaultRPC : number
    rpcs: RPC[]
}

export interface Token {
    address: string
    decimals: string
    simbol: string
    balance: string
}

type ViewConfig = keyof ViewConfigPage