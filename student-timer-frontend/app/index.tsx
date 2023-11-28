import { Redirect } from "expo-router";

export default function Home() {
  const loggedIn = false;
  const onboardingDone = false;

  if (loggedIn) {
    return <Redirect href={"/(tabs)"} />;
  } else if (onboardingDone) {
    <Redirect href={"/(auth)/login"} />;
  } else return <Redirect href={"/onboarding/"} />;
}
