import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface PendingStore {
    pending: number
    AnyPending: () => void
    NothingPending: () => void
}
const pendingStore = create<PendingStore>((set) => ({
    pending: 0,
    AnyPending: () => {
        set((state) => ({ pending : state.pending + 1}))
    },
    NothingPending: () => {
        set((state) => ({ pending : state.pending - 1}))
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