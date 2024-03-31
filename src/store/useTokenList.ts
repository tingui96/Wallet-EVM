import { create } from "zustand";
import { Token, TokenState } from "../types";
import { addToTokens, removeToken } from "../utils/utils";
import { GetTokens, SaveTokens } from "../storage/tokenStorage";
import { useShallow } from "zustand/react/shallow";

const getDefault = GetTokens()
const tokenListStore = create<TokenState>((set) => ({
    tokenList: getDefault,
    addToken: (token:Token) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(addToTokens(state.tokenList,token))
        }))
    },
    removeToken: (index:number) => {
        set((state) => ({
            ...state,
            tokenList: SaveTokens(removeToken(state.tokenList,index))
        }))
    }
}))

export function useTokenList() {
    return tokenListStore(
        useShallow((state) => ({
            tokenList: state.tokenList,
            addToken: state.addToken,
            removeToken: state.removeToken
        }))
    )
}