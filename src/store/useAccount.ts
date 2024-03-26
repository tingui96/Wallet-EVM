import { create } from "zustand";
import { ClearAccount, GetAccount, SaveAccount } from "../storage/accountStorage";
import { useShallow } from "zustand/react/shallow";
import { Account, AccountState } from "../types";

const defaultAccount = GetAccount()

const accountStore = create<AccountState>((set) => ({
    account: defaultAccount,
    setAccount: (account:Account|null) => {
        set((state) => ({
            ...state,
            account: SaveAccount(account),
            hasPass: true
            
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