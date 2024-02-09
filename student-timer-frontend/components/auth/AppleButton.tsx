import Button from "@/components/Button";
import { AppleIcon } from "@/components/Icons";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LOGIN_PROVIDER, useAuth } from "@/context/AuthContext";

export default function AppleButton() {
  const router = useRouter();
  const { onLogin } = useAuth();

  const onLoginApple = async () => {
    try {
      const user = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(JSON.stringify(user, null, 2));
      if (!user.email || !user.identityToken)
        //uncomment the user.email validation for Expo Go
        throw Error("Credentials are null");
      const userName = "".concat(
        user.fullName?.namePrefix ? user.fullName?.namePrefix + " " : "",
        user.fullName?.givenName ? user.fullName?.givenName + " " : "",
        user.fullName?.middleName ? user.fullName?.middleName + " " : "",
        user.fullName?.familyName ? user.fullName?.familyName + " " : "",
        user.fullName?.nameSuffix || ""
      );
      const result = await onLogin!(
        user.email, //|| "mail@appleid.com", set your Apple ID to use with expo go
        undefined,
        user.identityToken,
        user.user,
        user.fullName?.nickname || userName || "No Name",
        LOGIN_PROVIDER.APPLE
      );
      if (result && result.error) {
        console.error(result.error);
      } else {
        router.push("/(tabs)/(tracking)");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [appleAuthAvailible, setAppleAuthAvailible] = useState(false);

  useEffect(() => {
    const checkAppleAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailible(isAvailable);
    };
    checkAppleAvailable();
  });

  return (
    <>
      {appleAuthAvailible ? (
        <Button
          text="Weiter mit Apple"
          backgroundColor="#000"
          textColor="#fff"
          onPress={onLoginApple}
          iconLeft={<AppleIcon size={30} />}
          centerIcon
        />
      ) : null}
    </>
  );
}
