import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import SafeScreen from '@/components/SafeScreen';
import SplashScreen from '../app/splash/SplashScreen';
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
      tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );
}
