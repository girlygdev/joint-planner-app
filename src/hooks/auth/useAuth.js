import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '../../../firebaseConfig';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import QueryKeys from '../../actions/auth/QueryKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthStore from '../../store/useAuthStore';

const fetchUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('authUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userObj = { uid: user.uid, email: user.email };
          await AsyncStorage.setItem('authUser', JSON.stringify(userObj));
          resolve(userObj);
        } else {
          await AsyncStorage.removeItem('authUser');
          resolve(null);
        }
      });

      return () => unsubscribe();
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { setUser, clearUser } = useAuthStore(state => state)

  const {data: user, isLoading} = useQuery({
    queryKey: QueryKeys.default,
    queryFn: fetchUser,
    onSuccess: (user) => {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    }
  });

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userObj = { uid: response.user.uid, email: response.user.email };

      await AsyncStorage.setItem('authUser', JSON.stringify(userObj));
      setUser(userObj)

      queryClient.invalidateQueries(QueryKeys.default);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userObj = { uid: response.user.uid, email: response.user.email };

      await AsyncStorage.setItem('authUser', JSON.stringify(userObj));
      setUser(userObj)

      queryClient.invalidateQueries(QueryKeys.default);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('authUser')

    clearUser()
    queryClient.invalidateQueries(QueryKeys.default);
  };

  return {user, isLoading, login, logout, register};
};
