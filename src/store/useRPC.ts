import { create } from "zustand"
import { RpcState } from "../types"
import { addToRPCs, removeToRPCs } from "../utils/utils"
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
    addRPC: (url:string) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({
                    defaultRPC:state.defaultRPC,
                    rpcs:addToRPCs(state.rpcs,url)
                })
        }))
    },
    removeRPC: (index:number) => {
        set((state) => ({
            ...state,
            rpcs: SaveRPCS({
                defaultRPC: state.defaultRPC,
                rpcs: removeToRPCs(state.rpcs,index)
            }) 
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
            removeRPC: state.removeRPC
        })))}
