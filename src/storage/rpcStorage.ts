import { defaultRPC } from "../const"
import { RPC } from "../types"

export const GetRPCs = ():RPC => {
    const rpc = localStorage.getItem('rpc')
    const result:RPC = (rpc) ? JSON.parse(rpc) : defaultRPC
    return result
}
export const SaveRPCS = (rpc: RPC) => {
    let newRpc = structuredClone(rpc)
    let index = rpc.rpcs.lastIndexOf(rpc.defaultRPC)
    if(index === -1) newRpc.defaultRPC = rpc.rpcs[0]
    localStorage.setItem('rpc',JSON.stringify(newRpc))
    return rpc.rpcs
}

export const SaveDefaultRPCS = (rpc: RPC,index: number) => {
    let newRPC = structuredClone(rpc)
    newRPC.defaultRPC = newRPC.rpcs[index]
    localStorage.setItem('rpc',JSON.stringify(newRPC))
    return newRPC.defaultRPC
}