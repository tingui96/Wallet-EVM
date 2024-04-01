import { create } from "zustand"
import { RPC, RpcState, Token } from "../types"
import { addToRPCs, addToTokens, removeToRPCs, removeToken, verifyRemoveDefault } from "../utils/utils"
import { useShallow } from "zustand/react/shallow"
import { GetRPCs,SaveDefaultRPCS,SaveRPCS } from "../storage/rpcStorage"

const defaultRPC = GetRPCs()

const rpcStore = create<RpcState>((set) => ({
    defaultRPC: defaultRPC.defaultRPC,
    rpcs : defaultRPC.rpcs,
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
                })
        }))
    },
    removeRPC: (index:number) => {
        set((state) => ({
            ...state,
            defaultRPC: verifyRemoveDefault(state.defaultRPC,index),
            rpcs: SaveRPCS({
                defaultRPC:verifyRemoveDefault(state.defaultRPC,index) ,
                rpcs: removeToRPCs(state.rpcs,index)}) 
        }))
    },
    updateTokenList: (newRPCList:RPC[]) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({defaultRPC:state.defaultRPC, rpcs:newRPCList})
        }))
    },
    addToken: (token:Token) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({defaultRPC:state.defaultRPC,rpcs: addToTokens(state.rpcs,state.defaultRPC,token)})
        }))
    },
    removeToken: (index:number) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({defaultRPC:state.defaultRPC,rpcs:removeToken(state.rpcs,state.defaultRPC,index)})
        }))
    }
}))

export function useRPC() {
    return rpcStore(
      useShallow((state) => 
        ({
            defaultRPC: state.defaultRPC,
            rpcs: state.rpcs,
            selectRPC: state.selectRPC,
            addRPC: state.addRPC,
            removeRPC: state.removeRPC,
            updateTokenList: state.updateTokenList,
            addToken: state.addToken,
            removeToken: state.removeToken
        })))}
