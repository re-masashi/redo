import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import TrackPlayer from 'react-native-track-player';

// AppRegistry.registerComponent(...);
// TrackPlayer.registerPlaybackService(() => require('./service'));

import { AppRegistry, Linking } from 'react-native';
import TrackPlayer from 'react-native-track-player';
// import { name as appName } from './app.json';
import { playbackService } from './service';

// AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync()

export default function RootLayout() {
  {
    Linking.addEventListener('url', (data) => {
      router.navigate("/controls")
    });
    Linking.getInitialURL().then(url => console.log(url));
  }

  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   console.log("not loaded")
  //   return null;
  // }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
