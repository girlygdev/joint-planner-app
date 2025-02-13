import {create} from 'zustand';

const useAppStore = create((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({isLoading})
}));

export default useAppStore;
