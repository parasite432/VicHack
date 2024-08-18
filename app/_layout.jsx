import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router/stack';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <Stack>
      <PaperProvider>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </PaperProvider>
    </Stack>
  );
}

