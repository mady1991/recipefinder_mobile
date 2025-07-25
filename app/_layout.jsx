import SafeScreen from '@/components/SafeScreen';
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {

  const [splashLoading, setSplashLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashLoading(false);
    }, 2500);

  }, []);


  //if (splashLoading) return <SplashScreen />;
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
