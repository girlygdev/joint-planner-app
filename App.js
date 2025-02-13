import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScreenLoader from './src/components/UI/ScreenLoader';
import useAppStore from './src/store/useAppStore';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient =  new QueryClient();

export default function App() {
  const {isLoading} = useAppStore(state => state);

  const [fontsLoaded] = useFonts({
    'caveat': require('./assets/fonts/Caveat-Variable.ttf'),
    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style='auto' />
      
      {isLoading && <ScreenLoader />}

      <Navigation />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
