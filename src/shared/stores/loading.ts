import { create } from 'zustand'

interface LoadingState {
	isLoading: boolean
	setLoading: (loading: boolean) => Promise<void>
}

const useLoadingStore = create<LoadingState>(set => ({
	isLoading: false,
	setLoading: async loading => set({ isLoading: loading }),
}))

export default useLoadingStore
