import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Separator from "@/components/Separator";
import Button from "@/components/Button";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";

export default function ProfilScreen() {
  const router = useRouter();
  const logout = () => {
    router.push("/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Separator />
      <View style={{ height: 50, width: 200 }}>
        <Button
          text="Log Out"
          backgroundColor={COLORTHEME.light.primary}
          textColor={COLORTHEME.light.grey2}
          onPress={logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
