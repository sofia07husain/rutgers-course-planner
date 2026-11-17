import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Palette } from '../constants/palette';

SplashScreen.preventAutoHideAsync();

//Stack acts like a stack! it stacks the screens on top of each other so u can navigate back and forth with it
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerTintColor: Palette.scarlet }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: 'Find Courses' }} />
      </Stack>
    </ThemeProvider>
  );
}