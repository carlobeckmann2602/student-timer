import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Home() {
  const { authState } = useAuth();
  const onboardingDone = false;

  if (authState?.authenticated) {
    return <Redirect href={"/(tabs)"} />;
  } else if (onboardingDone) {
    <Redirect href={"/(auth)/login"} />;
  } else return <Redirect href={"/onboarding/"} />;
}
