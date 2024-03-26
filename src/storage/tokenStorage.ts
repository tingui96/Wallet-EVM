import { Token } from "../types"

export const GetTokens = ():Token[] => {
    const tokenList = localStorage.getItem('tokens')
    const result:Token[] = (tokenList) ? JSON.parse(tokenList) : []
    return result
}
export const SaveTokens = (tokenList: Token[]) => {
    localStorage.setItem('tokens',JSON.stringify(tokenList))
    return true
}