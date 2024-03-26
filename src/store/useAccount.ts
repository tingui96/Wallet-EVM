import { create } from "zustand";
import { ClearAccount, GetAccount, SaveAccount } from "../storage/accountStorage";
import { useShallow } from "zustand/react/shallow";
import { Account, AccountState } from "../types";



const accountStore = create<AccountState>((set) => ({
    account: GetAccount(),
    isSaved: false,
    hasPass: false,
    setAccount: (account:Account|null) => {
        set((state) => ({
            ...state,
            account: account,
            hasPass: true
        }))
        set((state) => ({
            ...state,
            isSaved: SaveAccount(state.account)
        }))
    },
    ClearAccount : () => {
        set((state) => ({
            ...state,
            account: ClearAccount()
        }))
    },
}))

export function useAccount () {
    return accountStore(
        useShallow((state) => ({
            account: state.account,
            setAccount: state.setAccount,
            ClearAccount: state.ClearAccount
        }))
    )
}