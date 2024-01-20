import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { getStoredItem } from "@/libs/deviceStorage";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Home() {
  const { authState } = useAuth();
  const router = useRouter();

  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    const loadOnboarding = async () => {
      const onboardingDoneString = await getStoredItem("onboarding");
      if (onboardingDoneString)
        setOnboardingDone(JSON.parse(onboardingDoneString));
      if (onboardingDone) router.push("/(auth)/login");
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
