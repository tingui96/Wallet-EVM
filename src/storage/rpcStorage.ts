import { defaultRPC } from "../const"
import { RPC } from "../types"

export const GetRPCs = ():RPC => {
    const rpc = localStorage.getItem('rpc')
    const result:RPC = (rpc) ? JSON.parse(rpc) : defaultRPC
    return result
}
export const SaveRPCS = (rpc: RPC) => {
    localStorage.setItem('rpc',JSON.stringify(rpc))
    return rpc.rpcs
}

export const SaveDefaultRPCS = (rpc: RPC,index: number) => {
    let newRPC = structuredClone(rpc)
    newRPC.defaultRPC = newRPC.rpcs[index]
    localStorage.setItem('rpc',JSON.stringify(newRPC))
    return newRPC.defaultRPC
}