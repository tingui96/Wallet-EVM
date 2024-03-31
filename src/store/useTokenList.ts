import { create } from "zustand";
import { Token, TokenState } from "../types";
import { addToTokens, removeToken } from "../utils/utils";
import { GetTokens, SaveTokens } from "../storage/tokenStorage";
import { useShallow } from "zustand/react/shallow";

const getDefault = GetTokens()
const tokenListStore = create<TokenState>((set) => ({
    tokenList: getDefault,
    isSaved: false,
    addToken: (token:Token) => {
        set((state) => ({
            ...state,
            tokenList: addToTokens(state.tokenList,token)
        }))
        set((state) => ({
            ...state,
            isSaved: SaveTokens(state.tokenList)
        }))
    },
    removeToken: (index:number) => {
        set((state) => ({
            ...state,
            tokenList: removeToken(state.tokenList,index)
        }))
        set((state) => ({
            ...state,
            isSaved: SaveTokens(state.tokenList)
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