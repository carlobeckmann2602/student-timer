import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";

import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

export default function OtherLogins() {
  // uncomment Google Button in development (Google does not work in Expo Go)
  return (
    <View style={styles.buttons}>
      {/* <GoogleButton /> */}
      <AppleButton />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "column",
    width: 200,
    gap: 15,
  },
});
