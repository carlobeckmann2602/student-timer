import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import Separator from "@/components/Separator";
import { useEffect, useState } from "react";
import { useAxios } from "@/context/AxiosContext";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

export default function StatisticsScreen() {
  const [result, setResult] = useState(null);
  const { authAxios } = useAxios();
  const { authState } = useAuth();

  const dummyCall = async () => {
    try {
      console.log("Dummy Call Pressed");
      setResult(
        (await authAxios?.get(`/students/${authState?.user.id}`))?.data
      );
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik</Text>
      <Separator />
      <View
        style={{
          flexDirection: "column",
          gap: 15,
          paddingHorizontal: 15,
          width: "100%",
        }}
      >
        <Button
          onPress={dummyCall}
          backgroundColor="black"
          text="API Call"
          textColor="white"
        />
        <Button
          onPress={() => {
            setResult(null);
          }}
          backgroundColor="red"
          textColor="white"
          text="Clear"
        />
        <Text style={{ textAlign: "center" }}>{JSON.stringify(result)}</Text>
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
