import { defaultRPCs } from "../const"
import { RpcType } from "../types"

export const GetRPCs = ():RpcType => {
    const rpc = localStorage.getItem('rpc')
    const result:RpcType = (rpc) ? JSON.parse(rpc) : { defaultRPC:0, rpcs:defaultRPCs}
    return result
}
export const SaveRPCS = (rpc: RpcType) => {
    let newRpc = structuredClone(rpc)
    if(newRpc.defaultRPC === -1 && newRpc.rpcs.length > 0) newRpc.defaultRPC = 0
    else if (newRpc.rpcs.length === 0) newRpc.defaultRPC = -1
    localStorage.setItem('rpc',JSON.stringify(newRpc))
    return rpc.rpcs
}

export const SaveDefaultRPCS = (rpc: RpcType,index: number) => {
    let newRPC = structuredClone(rpc)
    newRPC.defaultRPC = index
    localStorage.setItem('rpc',JSON.stringify(newRPC))
    return newRPC.defaultRPC
}