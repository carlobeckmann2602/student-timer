import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { getStoredItem } from "@/libs/deviceStorage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Home() {
  const { authState } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    const loadOnboarding = async () => {
      const onboardingDoneString = await getStoredItem("onboarding");
      setOnboardingDone(String(onboardingDoneString).toLowerCase() === "true");
    };
    loadOnboarding();
  }, []);

  if (authState?.authenticated == null) {
    return <Spinner />;
  }

  if (authState?.authenticated) {
    return <Redirect href={"/(tabs)/(tracking)"} />;
  } else if (onboardingDone) return <Redirect href={"/(auth)/login"} />;
  else return <Redirect href={"/onboarding/"} />;
}
