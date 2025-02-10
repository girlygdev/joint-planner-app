import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '../../../firebaseConfig';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import QueryKeys from '../../actions/auth/QueryKeys';

const fetchUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
    return () => unsubscribe();
  });
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Use React Query to manage auth state
  const {data: user, isLoading} = useQuery({
    queryKey: QueryKeys.default,
    queryFn: fetchUser,
    staleTime: Infinity, // Keep user data fresh
  });

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      queryClient.invalidateQueries(['authUser']);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      queryClient.invalidateQueries(['authUser']);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    queryClient.invalidateQueries(['authUser']);
  };

  return {user, isLoading, login, logout, register};
};
