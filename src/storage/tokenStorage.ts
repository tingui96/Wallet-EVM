import { TokensList } from "../types"

export const GetTokens = ():TokensList[] => {
    const tokenList = localStorage.getItem('tokens')
    const result:TokensList[] = (tokenList) ? JSON.parse(tokenList) : [[],[]]
    return result
}
export const SaveTokens = (tokenList: TokensList[]) => {
    localStorage.setItem('tokens',JSON.stringify(tokenList))
    return tokenList
}
export const ClearTokens = () => {
    localStorage.removeItem('tokens')
    return [[],[]]
}