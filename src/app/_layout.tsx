import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import NavBar from '../components/nav-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { ScheduleProvider } from '../context/schedule';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <ScheduleProvider>
  <Stack screenOptions={{ header: () => <NavBar /> }} />
      </ScheduleProvider>
    </ThemeProvider>
  );
}