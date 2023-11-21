import { Redirect } from "expo-router";

export default function Home() {
  const loggedIn = true;

  if (loggedIn) {
    return <Redirect href={"/"} />;
  } else return <Redirect href={"/login"} />;
}
