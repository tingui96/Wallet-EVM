import { create } from "zustand"
import { RpcState } from "../types"
import { addToRPCs, removeToRPCs } from "../utils/utils"
import { useShallow } from "zustand/react/shallow"
import { GetRPCs,SaveRPCS } from "../storage/rpcStorage"

const defaultRPC = GetRPCs()

const rpcStore = create<RpcState>((set) => ({
    defaultRPC: defaultRPC.defaultRPC,
    rpcs : defaultRPC.rpcs,
    isSaved : false,
    selectRPC: (index:number) => {
        set((state) => ({
            ...state,
            defaultRPC: state.rpcs[index]
        }))
        set((state) => ({
            ...state,
            isSaved: SaveRPCS({defaultRPC:state.defaultRPC,rpcs:state.rpcs})
        }))
    },
    addRPC: (url:string) => {
        set((state) => ({
            ...state,
            rpcs: addToRPCs(state.rpcs,url)
        }))
        set((state) => ({
            ...state,
            isSaved: SaveRPCS({defaultRPC:state.defaultRPC,rpcs:state.rpcs})
        }))
    },
    removeRPC: (index:number) => {
        set((state) => ({
            ...state,
            rpcs: removeToRPCs(state.rpcs,index)
        }))
        set((state) => ({
            ...state,
            isSaved: SaveRPCS({defaultRPC:state.defaultRPC,rpcs:state.rpcs})
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
