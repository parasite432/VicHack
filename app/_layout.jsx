import { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Text } from "react-native";

export default function Layout() {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      () => setIsFirebaseInitialized(true),
      (error) => setError(error)
    );

    return () => unsubscribe();
  }, []);

  if (error) {
    return <Text>Error initializing Firebase: {error.message}</Text>;
  }

  if (!isFirebaseInitialized) {
    return <Text>Initializing Firebase...</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
