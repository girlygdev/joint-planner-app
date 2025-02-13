import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({user}),
  clearUser: () => set({user: null}),

  eventCount: 0,
  setEventCount: (eventCount) => set({eventCount}),

  taskCount: 0,
  setTaskCount: (taskCount) => set({taskCount}),
}));

// Restore user on app launch
(async () => {
  const storedUser = await AsyncStorage.getItem('authUser');
  if (storedUser) {
    useAuthStore.setState({user: JSON.parse(storedUser)});
  }
})();

export default useAuthStore;
