import React, { useEffect } from "react";
import { Stack, useSegments, useRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";
import { AuthProvider, useAuth } from "./authContext";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === "(auth)";
      if (!user && !inAuthGroup) {
        // Redirect to the sign-in page if the user is not signed in
        router.replace("/login");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page if the user is signed in
        router.replace("/(tabs)");
      }
    }
  }, [user, loading, segments]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <ProtectedLayout />
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
