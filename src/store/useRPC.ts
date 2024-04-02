import { create } from "zustand"
import { RPC, RpcState, Token, TokensList } from "../types"
import { addToRPCs, addToTokens, addTokenList, removeToRPCs, removeToken, removeTokenfromTokenList, updateTokenBalance, verifyRemoveDefault } from "../utils/utils"
import { useShallow } from "zustand/react/shallow"
import { GetRPCs,SaveDefaultRPCS,SaveRPCS } from "../storage/rpcStorage"
import { defaultRPCs } from "../const"
import { ClearTokens, GetTokens, SaveTokens } from "../storage/tokenStorage"

const defaultRPC = GetRPCs()
const tokenList = GetTokens()

const rpcStore = create<RpcState>((set) => ({
    defaultRPC: defaultRPC.defaultRPC,
    rpcs : defaultRPC.rpcs,
    tokenList: tokenList,
    selectRPC: (index:number) => {
        set((state) => ({
            ...state,
            defaultRPC: SaveDefaultRPCS({
                defaultRPC:state.defaultRPC,
                rpcs:state.rpcs}
                ,index)
        }))
    },
    addRPC: (rpc:RPC) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({
                    defaultRPC:state.defaultRPC,
                    rpcs:addToRPCs(state.rpcs,rpc)
                }),
            tokenList: SaveTokens(addTokenList(state.tokenList))
        }))
    },
    removeRPC: (index:number) => {
        set((state) => ({
            ...state,
            defaultRPC: verifyRemoveDefault(state.defaultRPC,index),
            rpcs: SaveRPCS({
                defaultRPC:verifyRemoveDefault(state.defaultRPC,index) ,
                rpcs: removeToRPCs(state.rpcs,index)}), 
            tokenList: SaveTokens(removeTokenfromTokenList(state.tokenList,index))
        }))
    },
    ClearRPC: () => {
        set((state) => ({
            ...state,
            defaultRPC: 0,
            rpcs: SaveRPCS({
                defaultRPC:0,
                rpcs: defaultRPCs}) ,
            tokenList: ClearTokens()
            
        }))
    },    
    updateTokenList: (newTokenList:TokensList[]) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(newTokenList)
        }))
    },
    updateTokenBalance: (token:Token) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(updateTokenBalance(state.tokenList,state.defaultRPC,token))
        }))
    },
    addToken: (token:Token) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(addToTokens(state.tokenList,state.defaultRPC,token))
        }))
    },
    removeToken: (index:number) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(removeToken(state.tokenList,state.defaultRPC,index))
        }))
    }
}))

export function useRPC() {
    return rpcStore(
      useShallow((state) => 
        ({
            defaultRPC: state.defaultRPC,
            rpcs: state.rpcs,
            tokenList: state.tokenList,
            selectRPC: state.selectRPC,
            addRPC: state.addRPC,
            removeRPC: state.removeRPC,
            ClearRPC: state.ClearRPC,
            updateTokenBalance: state.updateTokenBalance,
            updateTokenList: state.updateTokenList,
            addToken: state.addToken,
            removeToken: state.removeToken
        })))}
