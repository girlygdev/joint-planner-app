import { useState } from 'react';

const useFirebaseAuthError = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setErrorMessage('The email address is invalid.');
        break;
      case 'auth/invalid-credential':
        setErrorMessage('The email or password is incorrect.');
        break;
      case 'auth/user-disabled':
        setErrorMessage('This account has been disabled.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setErrorMessage('The email or password is incorrect.');
        break;
      case 'auth/network-request-failed':
        setErrorMessage('Network error. Please check your internet connection.');
        break;
      case 'auth/email-already-exists':
      case 'auth/email-already-in-use':
        setErrorMessage('The email address is already taken.');
        break;
      case 'auth/weak-password':
        setErrorMessage('Password should be at least 6 characters.');
        break;
      default:
        setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return { errorMessage, handleAuthError };
};

export default useFirebaseAuthError