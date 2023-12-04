import { useAuth } from "@/context/AuthContext";
import { getStoredItem } from "@/libs/deviceStorage";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Home() {
  const { authState } = useAuth();
  const router = useRouter();

  let onboardingDone = false;

  useEffect(() => {
    const loadOnboarding = async () => {
      const onboardingDoneString = await getStoredItem("onbarding");
      if (onboardingDoneString)
        onboardingDone = JSON.parse(onboardingDoneString);
      if (onboardingDone) router.push("/(auth)/login");
    };
    loadOnboarding();
  }, []);

  if (authState?.authenticated) {
    return <Redirect href={"/(tabs)"} />;
  } else return <Redirect href={"/onboarding/"} />;
}
