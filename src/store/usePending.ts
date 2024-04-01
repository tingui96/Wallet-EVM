import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface PendingStore {
    pending: boolean
    AnyPending: () => void
    NothingPending: () => void
}
const pendingStore = create<PendingStore>((set) => ({
    pending: false,
    AnyPending: () => {
        set({pending : true})
    },
    NothingPending: () => {
        set({pending:false})
    }
}))

export function usePending () {
    return pendingStore(
        useShallow((state) => ({
            pending: state.pending,
            AnyPending: state.AnyPending,
            NothingPending: state.NothingPending
        }))
    )
}