import { Redirect } from "expo-router";

export default function Home() {
  const loggedIn = true;

  if (loggedIn) {
    return <Redirect href={"/(tabs)"} />;
  } else return <Redirect href={"/(auth)/login"} />;
}
