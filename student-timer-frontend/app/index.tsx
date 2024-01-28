import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { getStoredItem } from "@/libs/deviceStorage";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Home() {
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadOnboarding = async () => {
      const onboardingDoneString = await getStoredItem("onboarding");
      console.log(JSON.stringify(onboardingDoneString));
      if (JSON.stringify(onboardingDoneString)) {
        router.push("/(auth)/login");
      }
    };
    loadOnboarding();
  }, []);

  if (authState?.authenticated == null) {
    return <Spinner />;
  }

  if (authState?.authenticated) {
    return <Redirect href={"/(tabs)/(tracking)"} />;
  } else return <Redirect href={"/onboarding/"} />;
}
